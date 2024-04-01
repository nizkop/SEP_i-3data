import { Component } from '@angular/core';
import {Thread} from "../../Model/thread";
import {ThreadService} from "../../services/thread.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../Model/user";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-thread-uebersicht',
  templateUrl: './thread-uebersicht.component.html',
  styleUrls: ['./thread-uebersicht.component.css']
})
export class ThreadUebersichtComponent {
  threads :Thread[] = [];
  user :User = new User();

  constructor(private threadService :ThreadService,
              private router :Router,
              private userService :UserService) {}

  ngOnInit(){
    this.getCurrentUser().then(() => {
      this.getAllThreads()
    });

  }


  sortByFavs(threads: Thread[]){
    if(typeof this.user.favThreadIds !== 'undefined') {

        if (this.user.favThreadIds.length > 0) {
          let withoutFav = threads.filter((thread) => !this.user.favThreadIds.includes(thread.id));
          let favThreads = threads.filter((thread) => this.user.favThreadIds.includes(thread.id));
          let sortedThreads = favThreads.concat(withoutFav);
          this.threads = sortedThreads;
          console.log(this.threads[0]);
        }
        else{
          this.threads = threads;
        }
      }
    else {
        this.threads = threads;
    }
  }

  async getCurrentUser(){
   await new Promise<void>((resolve, reject) =>
     this.userService.getCurrentUser().subscribe(
      (data :User) => {
      this.user = data;
      resolve();
    },
       (error) => {
        reject();
       }));
  }

  getAllThreads(){
    this.threadService.getAllThreads().subscribe(
      (data :Thread[]) => {
        this.sortByFavs(data);
      },
      (error) => {
        console.log(error);
      })
  }

  viewThread(threadId :number){
    this.router.navigate(['/thread/' + threadId]);
  }

  onRowClick(event: MouseEvent, threadId :number){
    const target = event.target as HTMLElement;
    const isButtonToggle = target.closest('mat-button-toggle');
    const isButtonToggleGroup = target.closest('mat-button-toggle-group')

    if(!isButtonToggle && !isButtonToggleGroup){
      this.viewThread(threadId);
    }

  }

  toggleLike(threadId: number){
    if(typeof this.user.likedThreads === 'undefined'){
      this.user.likedThreads = [];
    }

    if(typeof this.user.likedThreads.find((thread) => thread == threadId) !== 'undefined'){
      this.userService.removeLikedThread(threadId, this.user.id).subscribe(() => { console.log("Thread wurde disliked"); });
      let newLikes = this.user.likedThreads.filter((thread) => thread != threadId);
      this.user.likedThreads = newLikes;
      this.threadService.dislikeThread(threadId).subscribe(()=>{
        console.log("Thread wurde erfolgreich disliked");
      });
    }
    else{
      this.user.likedThreads.push(threadId);
      this.userService.addLikedThread(threadId, this.user.id).subscribe(() => { console.log("Thread wurde geliked");})
      this.threadService.likeThread(threadId).subscribe(() => {console.log("Thread wurde geliked");})
    }
  }

  isInLikes(threadId: number){
    if(typeof this.user.likedThreads.find((thread) => thread == threadId) !== 'undefined'){
      return true;
    }
    return false;
  }

  toggleFav(threadId: number){
    if(typeof this.user.favThreadIds === 'undefined'){
      this.user.favThreadIds = [];
    }
    if(typeof this.user.favThreadIds.find((thread)=> thread === threadId) !== 'undefined'){
      let newFavs = this.user.favThreadIds.filter((thread) => thread != threadId);
      this.user.favThreadIds = newFavs;
      this.userService.deleteFavThread(threadId, this.user.id).subscribe(() => {console.log("Favoriten wurden geupdatet")})
      this.threadService.removeFavUser(threadId, this.user.email).subscribe(() => {
        console.log("User wurde aus der Email-liste des Threads entfernt")
      })
    }
    else {
      this.user.favThreadIds.push(threadId)
      this.userService.addFavThread(threadId, this.user.id).subscribe(() => {
        console.log("Favoriten wurden erfolgreich aktualisiert!");
      });
      this.threadService.postFavUser(threadId, this.user.email).subscribe(()=> {
        console.log("User ist nun in der Email-liste des Threads")
      });
    }

  }


  isInFavs(FavThreadId: number) :boolean{
    let userFavs = this.user.favThreadIds;
      if (userFavs.length > 0) {
        let favThread = userFavs.find((threadId) => threadId === FavThreadId)
        if (typeof favThread !== 'undefined') {
          return true;
        }
      }

    return false;
  }


}

