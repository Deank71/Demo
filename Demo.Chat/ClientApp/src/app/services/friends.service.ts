import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { tap, catchError, mapTo } from 'rxjs/operators';
import { Observable, of, Subject } from "rxjs";
import { config } from '../config';


@Injectable({
  providedIn: 'root'
})
export class FriendsService {


  constructor(private http: HttpClient) { }

  RequestFriend(email: string ): Observable<boolean> {
    return this.http.post<string>(`${config.apiUrl}/api/RequestFriend`,email)
      .pipe(
        tap(request => request),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  getRequetsedFriends(user: { email: string }): Observable<boolean> {
    return this.http.get<any>(`${config.apiUrl}/api/RequestedFriend?email=${user.email}`)
      .pipe(
        tap(request => request),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }
}
