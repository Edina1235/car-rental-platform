import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user?: User;
  public main_url = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  public getUserWithId(id: string) {
    return this.http.get(this.main_url + `/${id}`, {withCredentials: true});
  }

  public getUsers() {
    return this.http.get(this.main_url, {withCredentials: true});
  }

  public updateUserWithId(id: string, user: User) {
    return this.http.put(this.main_url + `/${id}`, user, {withCredentials: true});
  }

  public deleteUserWithId(id: string) {
    return this.http.delete(this.main_url + `/${id}`, {withCredentials: true});
  }
  
}
