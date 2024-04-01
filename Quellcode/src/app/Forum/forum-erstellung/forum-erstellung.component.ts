import { Component } from '@angular/core';
import {ThreadService} from "../../services/thread.service";
import {Thread} from "../../Model/thread";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forum-erstellung',
  templateUrl: './forum-erstellung.component.html',
  styleUrls: ['./forum-erstellung.component.css']
})
export class ForumErstellungComponent {

  options = ['Datensätze', 'Memes', 'Sonstiges'];
  selectedOption = "";
  titel="";
  inhalt="";

  constructor(private threadService :ThreadService,
              private router: Router) {}



  onSelectionChange(value: string){
    this.selectedOption = value;
    console.log('auswahl geändert:', value);
  }

  submit(){
    let thread :Thread = new Thread()
    thread.name = this.titel;
    thread.threadDescription = this.inhalt;
    thread.category = this.selectedOption;
    console.log(thread);
    this.threadService.createThread(thread).subscribe(
      (response) => {

        this.router.navigate(["thread/"+response.id])

        },
      (error) => console.log(error));

    this.titel = "";
    this.inhalt = "";
  }

  getAllThreads(){
    this.threadService.getAllThreads().subscribe((data :Thread[]) => {
      console.log(data[0]);
    })
  }
}
