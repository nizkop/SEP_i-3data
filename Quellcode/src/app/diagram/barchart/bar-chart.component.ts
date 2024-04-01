import {Component, Inject} from '@angular/core';
import * as d3 from 'd3';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Diagrammodel} from "../../Model/Diagrammodel";
@Component({
  selector: 'app-balkentable2',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit(){
    const highestValue = this.data.reduce((max : number, entry : Diagrammodel) => {
      if (entry.zahl === null) {
        return max;
      }
      return entry.zahl > max ? entry.zahl : max;
    }, -Infinity);
    this.drawBars(this.data, highestValue);
  }

  drawBars(data:Diagrammodel[], highestValue: number){
    let svg: any;
    let margin = 75;
    let width = 950 -(margin*2);
    let height = 600 - (margin*2);

    svg = d3.select("figure#bar2")
      .append("svg")
      .attr("width",width+(margin*2))
      .attr("height",height+(margin*2))
      .append("g")
      .attr("transform","translate("+margin+","+margin+")");

    svg.data(data);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, highestValue+10])
      .range([height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.name))
      .attr("y", (d: any) => y(d.zahl))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => height - y(d.zahl))
      .attr("fill", "#D8D4FF");
  }
}
