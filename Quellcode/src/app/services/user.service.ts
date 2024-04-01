import { Injectable } from '@angular/core';
import {User} from "../Model/user";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import { map, catchError } from 'rxjs/operators';
import {of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/User';

  constructor(private http: HttpClient) { }



  addLikedThread(threadId: number, userId: number){
    return this.http.post<number>(`${this.apiUrl}/like/${threadId}`, userId);
  }

  removeLikedThread(threadId: number, userId: number){
    return this.http.put<number>(`${this.apiUrl}/dislike/${threadId}`, userId)
  }

  addFavThread(threadId:number, userId:number){
    return this.http.post<number>(`${this.apiUrl}/save/${threadId}`, userId);
  }

  deleteFavThread(threadId:number, userId:number){
    return this.http.put<number>(`${this.apiUrl}/delete/${threadId}`, userId);
  }


  Login(username :String, password :String) :Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/Login/${username}/${password}`);
  }

  getUserByUsername(username:String) :Observable<User>{
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }
    return this.http.get<User>(`${this.apiUrl}/getByUsername/${username}`)
  }

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  createUser(entry: User): Observable<User> {
    const token = localStorage.getItem('access_token');
    console.log("CreateUser", entry);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<User>(`${this.apiUrl}/add`, entry, { headers });
  }

  updateUser(entryId: number, user: User): Observable<User> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<User>(`${this.apiUrl}/update/${entryId}`, user, { headers });
    console.log("updateUser: ", this.http.put<User>(`${this.apiUrl}/update/${entryId}`, user, { headers }));
  }

  deleteUser(entryId: number): Observable<{}> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/delete/${entryId}`, { headers });
  }

  getUserById(entryId: number): Observable<User> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/get/${entryId}`, { headers });
  }
  getUserByEmail(email:string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/get/${email}`)
  }
  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/token/${token}`, { headers });
  }

  getFriends(entryId: number): Observable<User> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/${entryId}/friends`);
  }

  getFriendrequests(entryId: number): Observable<User>{
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/${entryId}/friendrequests`);
  }

  getFriendsprivacy(entryId: number): Observable<boolean>{
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User is not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(`${this.apiUrl}/${entryId}/friendsprivacy`,);
  }

  viewImage(route: ActivatedRoute): Observable<string> {
    // vereinheitlich hier, da mehrfach genutzt und sicherzustellen, dass editprofile und viewprofile die gleichen Pfade fürs Defautlbild nutzen
    return this.http.get('http://localhost:8080/User/get/image/' + route.snapshot.params['id'])
      .pipe(
        map((res: any) => {
          if (res.image) {
            return 'data:image/jpeg;base64,' + res.image;
          } else {
            return '/assets/prfPictures/defaultpfp.jpg';
          }
        }),
        catchError(() => {
          return of('/assets/prfPictures/defaultpfp.jpg');
        })
      );
  }


}
