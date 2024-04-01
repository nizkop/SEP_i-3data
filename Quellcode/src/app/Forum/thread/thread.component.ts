import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ThreadService} from "../../services/thread.service";
import {Thread} from "../../Model/thread";
import {ActivatedRoute, Router} from "@angular/router";
import {Article} from "../../Model/article";
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";
import {UserRole} from "../../Model/userrole";
import {EmailService} from "../../services/email.service"


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit{
  thread: Thread = new Thread();
  comments: Article[] = [];
  newcomment: Article = new Article();
  loggedin: User = new User;
  isadmin: boolean = false;
  constructor(private threadService: ThreadService,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private userService: UserService,
              private emailService: EmailService,
              private router: Router
              ) {




  }
  ngOnInit(): void {
  this.getThread();
  this.getLoggedinUser();
    }

  getLoggedinUser(): void {
    this.userService.getCurrentUser().subscribe((response: User) => {
      this.loggedin = response;
      console.log(this.loggedin.role);
      // @ts-ignore
      if(this.loggedin.role === UserRole[UserRole.ADMIN]){
        this.isadmin = true;
      }
      console.log(this.isadmin);
    });
  }
  getThread(){
    this.threadService.getThread(this.route.snapshot.params['id']).subscribe((data: Thread) =>{
      this.thread = data;
      this.comments = data.articles;
      console.log(this.thread);
      console.log(this.comments);
    });
  }
  zurueck(){
    this.router.navigate(["thread-uebersicht"]);
  }

  sendArticle(comment: string){
    this.newcomment.writtenBy=this.loggedin.userName;
    this.newcomment.payload=comment;
    this.threadService.sendArticle(this.route.snapshot.params['id'], this.newcomment).subscribe(
      (response : Article)=>{
      console.log(this.newcomment);
      this.sendMail();
      this.getThread();},
    (error) =>console.log(error));
  }

  deleteArticle(id: number){
  this.threadService.deleteArticle(id).subscribe((response: Article) =>{
    this.getThread();},
    (error)=>console.log(error));
    }

  sendMail() {
    if (this.thread.favUser && this.thread.favUser.length > 0) {
      for (let i = 0; i < this.thread.favUser.length; i++) {
        const userMail = this.thread.favUser[i];
        // Perform actions for each userMail
        console.log(userMail);
        this.emailService.sendForumnotif(userMail).subscribe(()=>{
          console.log('Email gesendet');},
          (error)=>console.log(error));
        };
        // Send email, etc.
      }
    }



  toggleLike(threadId: number){
    if(typeof this.loggedin.likedThreads === 'undefined'){
      this.loggedin.likedThreads = [];
    }

    if(typeof this.loggedin.likedThreads.find((thread) => thread == threadId) !== 'undefined'){
      this.userService.removeLikedThread(threadId, this.loggedin.id).subscribe(() => { console.log("Thread wurde disliked"); });
      let newLikes = this.loggedin.likedThreads.filter((thread) => thread != threadId);
      this.loggedin.likedThreads = newLikes;
      this.threadService.dislikeThread(threadId).subscribe(()=>{
        this.thread.timesLiked--;
        console.log("Thread wurde erfolgreich disliked");
      });
    }
    else{
      this.loggedin.likedThreads.push(threadId);
      this.userService.addLikedThread(threadId, this.loggedin.id).subscribe(() => { console.log("Thread wurde geliked");})
      this.threadService.likeThread(threadId).subscribe(() => {
        console.log("Thread wurde geliked");
        this.thread.timesLiked++;
      })
    }
  }

  isInLikes(threadId: number){
    if(typeof this.loggedin.likedThreads.find((thread) => thread == threadId) !== 'undefined'){
      return true;
    }
    return false;
  }

  toggleFav(threadId: number){
    if(typeof this.loggedin.favThreadIds === 'undefined'){
      this.loggedin.favThreadIds = [];
    }
    if(typeof this.loggedin.favThreadIds.find((thread)=> thread === threadId) !== 'undefined'){
      let newFavs = this.loggedin.favThreadIds.filter((thread) => thread != threadId);
      this.loggedin.favThreadIds = newFavs;
      this.userService.deleteFavThread(threadId, this.loggedin.id).subscribe(() => {console.log("Favoriten wurden geupdatet")})
      this.threadService.removeFavUser(threadId, this.loggedin.email).subscribe(() => {
        console.log("User wurde aus der Email-liste des Threads entfernt")
      })
    }
    else {
      this.loggedin.favThreadIds.push(threadId)
      this.userService.addFavThread(threadId, this.loggedin.id).subscribe(() => {
        console.log("Favoriten wurden erfolgreich aktualisiert!");
      });
      this.threadService.postFavUser(threadId, this.loggedin.email).subscribe(()=> {
        console.log("User ist nun in der Email-liste des Threads")
      });
    }

  }


  isInFavs(FavThreadId: number) :boolean{
    let userFavs = this.loggedin.favThreadIds;
    if (userFavs.length > 0) {
      let favThread = userFavs.find((threadId) => threadId === FavThreadId)
      if (typeof favThread !== 'undefined') {
        return true;
      }
    }

    return false;
  }
}
