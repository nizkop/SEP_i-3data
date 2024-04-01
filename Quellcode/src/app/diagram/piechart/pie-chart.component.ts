import {Component, Inject} from '@angular/core';
import * as d3 from "d3";
import {Diagrammodel} from "../../Model/Diagrammodel";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
@Component({
  selector: 'app-pietable2',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit(){
    this.drawPie(this.data)
  }

  private drawPie(data: Diagrammodel[]): void {
    let svg: any;
    let width = 600;
    let height = 600;
    let radius = Math.min(width, height) / 2;
    let colors = d3.scaleOrdinal()
      .domain(data.map(d => d.zahl !== null ? d.zahl.toString() : ""))
      .range([ "#C5FFEB",
        "#D8D4FF",
        "#B5DDFF",
        "#C5FFEB",
        "#DEFFF7",
        "#FFD3B5",
        "#FFF6B5",
        "#FFB5DD",
        "#E8B5FF",
        "#B5FFDE",
        "#FFB5C5",
        "#B5E3FF"]);



    svg = d3.select("figure#pietable2")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + height / 2 + ")"
      );

    const pie = d3.pie<Diagrammodel>().value((d: Diagrammodel) => Number(d.zahl));

    svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', (d: any, i: any) => (colors(i)))
      .attr("stroke", "#000000")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(radius);

    svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d: any) => d.data.name)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }
}
