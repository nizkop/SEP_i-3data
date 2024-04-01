import {Component, Inject} from '@angular/core';
import {OnInit} from "@angular/core";
import {DataService} from "../../services/datenservices/data.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../Model/user";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-selectdiagrams',
  templateUrl: './selectdiagrams.component.html',
  styleUrls: ['./selectdiagrams.component.css']
})
export class SelectdiagramsComponent  implements OnInit{

  constructor(
    private userService: UserService
  ) { }
  profileuser : User = new User();
  selectedCharts: boolean[] = [false, false, false, false, false, false, false, false, false, false];
  selectedChartsAmount: number = 0;

  ngOnInit(): void {
    console.log( this.selectedCharts);
    this.getProfileUser();
    this.convertData();

  }

  toggleProfileViewPrivate() : void {

  }

  getProfileUser() {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser = response;
      if (response){
        this.convertData();
      }
    });
  }

  convertData() {
    this.selectedCharts = new Array(this.profileuser.selectedCharts.length).fill(false);

    for (let i = 0; i < this.profileuser.selectedCharts.length; i++) {
      if (this.profileuser.selectedCharts.charAt(i) === "1") {
        this.selectedCharts[i] = true;
      }
    }
    this.updateChartCount(0);
  }


  updateChartCount(position: number): void {
    this.selectedChartsAmount=0;
    for (let i = 0; i<this.selectedCharts.length; i++){
      if (this.selectedCharts[i]){
        this.selectedChartsAmount++;
      }
    }
  }

  saveSelectedCharts(): void {
    this.profileuser.selectedCharts = "";
    for (let i = 0; i < this.selectedCharts.length; i++) {
      if (this.selectedCharts[i]) {
        this.profileuser.selectedCharts += "1";
      } else {
        this.profileuser.selectedCharts += "0";
      }
    }

    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
      console.log("Benutzerdaten wurden erfolgreich aktualisiert:", this.profileuser);
    }, (error) => {
      console.error("Fehler beim Aktualisieren der Benutzerdaten:", error);
    });
  }








}
