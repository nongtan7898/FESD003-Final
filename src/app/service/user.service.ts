import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { hostUserIp } from '../classes/project-config';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public postSignup(user: User): Observable<any> {
    return this.http.post(hostUserIp + 'signup/', user);
  }
}
