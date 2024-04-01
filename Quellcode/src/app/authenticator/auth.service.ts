import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`http://localhost:8080/auth/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`http://localhost:8080/auth/authenticate`, credentials);
  }

  refreshToken() {
    return this.http.post(`http://localhost:8080/auth/refresh-token`, {});
  }

}
