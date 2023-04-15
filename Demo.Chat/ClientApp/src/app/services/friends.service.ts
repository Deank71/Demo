import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";

import { tap, catchError, mapTo } from 'rxjs/operators';
import { Observable, of, Subject } from "rxjs";
import { config } from '../config';
import { Friend } from "../models/friend";


@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  myfriends: Friend[] = [];

  constructor(private http: HttpClient) { }

  RequestFriend(email: string): Observable<boolean> {
    let httpParams = new HttpParams()
      .append("email", email)


    return this.http.get<string>(`${config.apiUrl}RequestFriend?email=${email}`)
      .pipe(
        tap(request => request),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  getRequestedFriends(): Observable<Friend[]> {
    
    return this.http.get<any>(`${config.apiUrl}FriendRequest`);
  }

  getActiveFriends(): Observable<Friend[]> {
    return this.http.get<any>(`${config.apiUrl}ActiveFriends`);
  }

  acceptRequestedFriends(requests: Friend[]): Observable<any> {

    return this.http.post<any>(`${config.apiUrl}AcceptRequest`, requests).pipe(
      tap(request => request),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  deleteFriendrequest(id :number): Observable<any> {
    return this.http.delete(`${config.apiUrl}DeleteRequests`);
  }
}
