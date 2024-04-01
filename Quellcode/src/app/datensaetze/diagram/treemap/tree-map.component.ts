import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import * as d3 from "d3";
import {Diagrammodel} from "../../../Model/Diagrammodel";
import {AnsichtsartPopup} from "../../../Model/ansichtsartPopup";

@Component({
  selector: 'app-treetable3',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.css']
})
export class TreeMapComponent {
  width: number = 800;
  height: number = 600;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit(){
    this.getMargins();
    this.drawTree(this.data.diagramData)
  }

  getMargins(){
    if(this.data.ansicht === AnsichtsartPopup.SAVE){ // Setzen auf möglichst große Größe fürs Screenshot-Generieren
      this.width = window.innerWidth- (75 * 6);
      this.height = window.innerHeight - (75 * 1);
    }else{
      console.log("Standard-Betrachtungsgröße für das Diagramm verwendet");
      this.width = 800;
      this.height = 600;
    }
  }

  drawTree(data: Diagrammodel[]) {
    console.log("drawTree:", data);

    const root: any = d3.hierarchy({ children: data })
      .sum((d: any) => d.zahl || 0);

    const treemap = d3.treemap()
      .size([this.width, this.height])
      .padding(1);

    treemap(root);

    const svg = d3.select("figure#treemap2")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    const cells = svg.selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

    cells.append("rect")
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("fill", "#D8D4FF");


    cells.append('text')
      .selectAll('tspan')
      .data((d: any) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
      .enter()
      .append('tspan')
      .attr('font-size', '12px')
      .attr('x', 4)
      .attr('y', (d: any, i: number) => 13 + 10 * i)
      .text((d: any) => d as string);


    cells.append("text")
      .attr("x", 5)
      .attr("y", 40)
      .text((d: any) => d.data.zahl);

  }
}
