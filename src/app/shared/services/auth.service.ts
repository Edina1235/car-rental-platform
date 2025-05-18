import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private main_url: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post(this.main_url + '/register', user);
  }

  public login(user: {username: string, password: string}) {
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    return this.http.post(this.main_url + '/login', body, {headers: headers, withCredentials: true});
  }

  public checkAuth() {
    return this.http.get<boolean>(this.main_url + '/checkAuth', {withCredentials: true});
  }

  public logout() {
    return this.http.post(this.main_url + '/logout', {}, {withCredentials: true, responseType: 'text'});
  }
}
