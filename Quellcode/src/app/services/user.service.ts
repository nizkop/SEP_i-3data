import { Injectable } from '@angular/core';
import {User} from "../Model/user";
import {DataSet} from "../Model/dataset";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Sterbefaelle} from "../Model/sterbefaelle";
import {Data} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/User';

  constructor(private http: HttpClient) { }

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
    console.log("test");
    console.log(this.http.put<User>(`${this.apiUrl}/update/${entryId}`, user, { headers }));
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
}
