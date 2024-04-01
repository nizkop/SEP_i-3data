import {Component, Inject} from '@angular/core';
import * as d3 from 'd3';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {Diagrammodel} from "../../../Model/Diagrammodel";
import {AnsichtsartPopup} from "../../../Model/ansichtsartPopup";
@Component({
  selector: 'app-balkentable2',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  margin = 135; //75 reicht für Table 3 und 4 nicht aus
  width: number = 950 -(this.margin*2);
  height: number =600 - (this.margin*2);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngAfterViewInit(){
    this.getMargins();
    const highestValue = this.data.diagramData.reduce((max : number, entry : Diagrammodel) => {
      if (entry.zahl === null) {
        return max;
      }
      return entry.zahl > max ? entry.zahl : max;
    }, -Infinity);
    this.drawBars(this.data.diagramData, highestValue);
  }

  getMargins(){
    if(this.data.ansicht === AnsichtsartPopup.SAVE){ // Setzen auf möglichst große Größe fürs Screenshot-Generieren
      this.width = window.innerWidth- (this.margin * 8);
      this.height = window.innerHeight - (this.margin * 3); // 3 etwas zu klein für Daten 3, 4
    }else{
      console.log("Standard-Betrachtungsgröße für das Diagramm verwendet");
      this.width = 950 -(this.margin*2);
      this.height = 600 - (this.margin*2);
    }
  }

  drawBars(data:Diagrammodel[], highestValue: number){
    console.log("drawBars:", data);
    let svg: any;

    svg = d3.select("figure#bar2")
      .append("svg")
      .attr("width",this.width+(this.margin*2))
      .attr("height",this.height+(this.margin*2))
      .append("g")
      .attr("transform","translate("+this.margin+","+this.margin+")");

    svg.data(data);

    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, highestValue+10])
      .range([this.height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.name))
      .attr("y", (d: any) => y(d.zahl))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.zahl))
      .attr("fill", "#D8D4FF");
  }
}
