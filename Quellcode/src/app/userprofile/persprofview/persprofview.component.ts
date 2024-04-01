import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import { UserService } from "../../services/user.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "../../Model/user";
import { Diagrammodel } from "../../Model/Diagrammodel";
import * as d3 from "d3";
import { DataService } from "../../services/datenservices/data.service";
import { Data2Service } from "../../services/datenservices/data2.service";
import { Data3Service } from "../../services/datenservices/data3.service";
import { Data4Service } from "../../services/datenservices/data4.service";
import { Data8Service } from "../../services/datenservices/data8.service";
import { VnNeugeboreneAC } from "../../Model/vn-neugeborene-ac";
import { Sterbefaelle } from "../../Model/sterbefaelle";
import { Arbeitssuchende } from "../../Model/arbeitssuchende";
import { Arbeitslose } from "../../Model/arbeitslose";
import { Geburten } from "../../Model/geburten";

@Component({
  selector: 'app-persprofview',
  templateUrl: './persprofview.component.html',
  styleUrls: ['./persprofview.component.css']
})
export class PersprofviewComponent implements OnInit {
  userId: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dataService: DataService,
    private data2Service: Data2Service,
    private data3Service: Data3Service,
    private data4Service: Data4Service,
    private data8Service: Data8Service
  ) { }

  profileuser: User = new User();
  diagramData1: Diagrammodel[] = [];
  diagramData2: Diagrammodel[] = [];
  diagramData3: Diagrammodel[] = [];
  diagramData4: Diagrammodel[] = [];
  diagramData8: Diagrammodel[] = [];
  entries1: VnNeugeboreneAC[] = [];
  entries2: Sterbefaelle[] = [];
  entries3: Arbeitssuchende[] = [];
  entries4: Arbeitslose[] = [];
  entries8: Geburten[] = [];
  entriesLoaded: number = 0;
  divs: string[] = ["diagram1", "diagram2", "diagram3", "diagram4"];

  ngOnInit() {
    console.log(this.data);
    this.userId= this.data.userID;
    console.log(this.userId);
    this.getUser();
    this.getEntries();
    this.getEntries2();
    this.getEntries3();
    this.getEntries4();
    this.getEntries8();
  }

  getUser():void{
    this.userService.getUserById(this.data.userID).subscribe((data: User)=>{
      console.log(data);
      this.profileuser=data;
      this.allEntriesLoaded();
    });
  }
  allEntriesLoaded(): void {
    this.entriesLoaded++;
    if (this.entriesLoaded==6){
      this.drawCharts();
    }
  }

  getEntries(): void {
    this.dataService.getDatensaetze().subscribe((data: VnNeugeboreneAC[]) => {
      this.entries1 = data;
      this.entries1.sort((a, b) => d3.descending(<number>a.anzahl, <number>b.anzahl));
      this.diagramData1=[];
      for (let i = 0; i < 30; i++) {
        this.diagramData1.push({ name: this.entries1[i].vorname, zahl: this.entries1[i].anzahl })
      }
      this.allEntriesLoaded();
    });
  }
  getEntries2(): void {
    this.data2Service.getDatensaetze().subscribe((data: Sterbefaelle[]) => {
      this.entries2 = data;
      this.diagramData2=[];
      this.diagramData2.push({ name: 'Januar', zahl: this.entries2[0].januar });
      this.diagramData2.push({ name: 'Februar', zahl: this.entries2[0].februar });
      this.diagramData2.push({ name: 'Maerz', zahl: this.entries2[0].maerz });
      this.diagramData2.push({ name: 'April', zahl: this.entries2[0].april });
      this.diagramData2.push({ name: 'Mai', zahl: this.entries2[0].mai });
      this.diagramData2.push({ name: 'Juni', zahl: this.entries2[0].juni });
      this.diagramData2.push({ name: 'Juli', zahl: this.entries2[0].juli });
      this.diagramData2.push({ name: 'August', zahl: this.entries2[0].august });
      this.diagramData2.push({ name: 'September', zahl: this.entries2[0].september });
      this.diagramData2.push({ name: 'Oktober', zahl: this.entries2[0].oktober });
      this.diagramData2.push({ name: 'November', zahl: this.entries2[0].november });
      this.diagramData2.push({ name: 'Dezember', zahl: this.entries2[0].dezember });
      this.allEntriesLoaded();
    });
  }
  getEntries3(): void {
    this.data3Service.getDatensaetze().subscribe((data: Arbeitssuchende[]) => {
      this.entries3 = data;
      this.diagramData3=[];
      this.diagramData3.push({ name: 'Arbeitsuchende (ELB)', zahl: this.entries3[0].col1 })
      this.diagramData3.push({ name: 'Ohne Berufsausbildung', zahl: this.entries3[0].col2 })
      this.diagramData3.push({ name: 'Betriebliche/schulische Ausbildung', zahl: this.entries3[0].col3 })
      this.diagramData3.push({ name: 'Akademische Ausbildung', zahl: this.entries3[0].col4 })
      this.diagramData3.push({ name: 'Ohne Angabe', zahl: this.entries3[0].col5 })
      this.diagramData3.push({ name: 'Kein Hauptschulabschluss', zahl: this.entries3[0].col6 })
      this.diagramData3.push({ name: 'Hauptschulabschluss', zahl: this.entries3[0].col7 })
      this.diagramData3.push({ name: 'Mittlere Reife', zahl: this.entries3[0].col8 })
      this.diagramData3.push({ name: 'Fachhochschulreife', zahl: this.entries3[0].col9 })
      this.diagramData3.push({ name: 'Abitur/Hochschulreife', zahl: this.entries3[0].col10 })
      this.diagramData3.push({ name: 'Ohne Angabe', zahl: this.entries3[0].col11 })
      this.allEntriesLoaded();
    });
  }
  getEntries4(): void {
    this.data4Service.getDatensaetze().subscribe((data: Arbeitslose[]) => {
      this.entries4 = data;
      this.diagramData4=[];
      this.diagramData4.push({ name: 'Arbeitsuchende (ELB)', zahl: this.entries4[0].col1 })
      this.diagramData4.push({ name: 'Männer', zahl: this.entries4[0].col2 })
      this.diagramData4.push({ name: 'Frauen', zahl: this.entries4[0].col3 })
      this.diagramData4.push({ name: 'unter 25 Jahren', zahl: this.entries4[0].col4 })
      this.diagramData4.push({ name: '25 bis unter 55 Jahren', zahl: this.entries4[0].col5 })
      this.diagramData4.push({ name: '55 Jahre und älter', zahl: this.entries4[0].col6 })
      this.diagramData4.push({ name: 'Langzeitarbeitslose ELB', zahl: this.entries4[0].col7 })
      this.diagramData4.push({ name: 'Männer', zahl: this.entries4[0].col8 })
      this.diagramData4.push({ name: 'Frauen', zahl: this.entries4[0].col9 })
      this.diagramData4.push({ name: 'unter 25 Jahren', zahl: this.entries4[0].col10 })
      this.diagramData4.push({ name: '25 bis unter 55 Jahren', zahl: this.entries4[0].col11 })
      this.diagramData4.push({ name: '55 Jahre und älter', zahl: this.entries4[0].col12 })
      this.allEntriesLoaded();
    });
  }
  getEntries8(): void {
    this.data8Service.getDatensaetze().subscribe((data: Geburten[]) => {
      this.entries8 = data;
      this.diagramData8=[];
      this.diagramData8.push({ name: 'Januar', zahl: this.entries8[0].januar })
      this.diagramData8.push({ name: 'Februar', zahl: this.entries8[0].februar })
      this.diagramData8.push({ name: 'Maerz', zahl: this.entries8[0].maerz })
      this.diagramData8.push({ name: 'April', zahl: this.entries8[0].april })
      this.diagramData8.push({ name: 'Mai', zahl: this.entries8[0].mai })
      this.diagramData8.push({ name: 'Juni', zahl: this.entries8[0].juni })
      this.diagramData8.push({ name: 'Juli', zahl: this.entries8[0].juli })
      this.diagramData8.push({ name: 'August', zahl: this.entries8[0].august })
      this.diagramData8.push({ name: 'September', zahl: this.entries8[0].september })
      this.diagramData8.push({ name: 'Oktober', zahl: this.entries8[0].oktober })
      this.diagramData8.push({ name: 'November', zahl: this.entries8[0].november })
      this.diagramData8.push({ name: 'Dezember', zahl: this.entries8[0].dezember })
      this.allEntriesLoaded();
    });
  }


  drawCharts() {
    let counter=0;
    if (this.profileuser.selectedCharts.charAt(0)=="1"){
      this.drawBars(this.diagramData1, this.divs[counter], "VornamenAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(1)=="1"){
      this.drawTree(this.diagramData1, this.divs[counter], "VornamenAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(2)=="1"){
      this.drawPie(this.diagramData2, this.divs[counter], "SterbefälleAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(3)=="1"){
      this.drawBars(this.diagramData2, this.divs[counter], "SterbefälleAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(4)=="1"){
      this.drawBars(this.diagramData3, this.divs[counter], "ArbeitssuchendeAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(5)=="1"){
      this.drawTree(this.diagramData3, this.divs[counter], "ArbeitssuchendeAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(6)=="1"){
      this.drawTree(this.diagramData4, this.divs[counter], "ArbeitsloseAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(7)=="1"){
      this.drawBars(this.diagramData4, this.divs[counter], "ArbeitsloseAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(8)=="1"){
      this.drawPie(this.diagramData8, this.divs[counter], "GeburtenAC");
      counter++;
    }
    if (this.profileuser.selectedCharts.charAt(9)=="1"){
      this.drawBars(this.diagramData8, this.divs[counter], "GeburtenAC");
      counter++;
    }
  }


  drawBars(data:Diagrammodel[], divID: string, chartName: string){
    const highestValue = d3.max(data, (d: Diagrammodel) => d.zahl) || 0;    let svg: any;
    let margin = 75;
    let fullWidth = window.innerWidth;
    let fullHeight = window.innerHeight;
    let width = fullWidth / 2.8 - (margin * 2);
    let height = fullHeight / 2.8 - (margin * 2);


    svg = d3.select("#"+divID)
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
      .domain([0, <number>highestValue+10])
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

    svg.append("text")
      .attr("class", "chart-name")
      .attr("x", width / 2)
      .attr("y", -margin / 2)
      .text(chartName);

    svg.selectAll(".chart-name").raise();
  }

  drawPie(data: Diagrammodel[], divID: string, chartName: string): void {
    let svg: any;
    const margin = 75;
    let fullWidth = window.innerWidth;
    let fullHeight = window.innerHeight;
    let width = fullWidth / 2.8;
    let height = fullHeight / 2.8;
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



    svg = d3.select("#" + divID)
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

    svg.append("text")
      .attr("class", "chart-name")
      .attr("x", width / 2)
      .attr("y", height / 2 + 20)
      .attr("text-anchor", "middle")
      .text(chartName);
  }

  drawTree(data: Diagrammodel[], divID: string, chartName: string) {
    const margin = 75;
    const fullWidth = window.innerWidth; // Volle Breite der Seite
    const fullHeight = window.innerHeight; // Volle Höhe der Seite
    const width = fullWidth / 2.8; // Ein Viertel der Breite
    const height = fullHeight / 2.8; // Ein Drittel der Höhe

    const root: any = d3.hierarchy({ children: data })
      .sum((d: any) => d.zahl || 0);

    const treemap = d3.treemap()
      .size([width, height])
      .padding(1);

    treemap(root);

    const svg = d3.select("#"+divID)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

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

    svg.append("text")
      .attr("class", "chart-name")
      .attr("x", width / 2)
      .attr("y", -margin / 2)
      .text(chartName);

    svg.selectAll(".chart-name").raise();
  }
}
