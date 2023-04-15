import * as moment from "moment";
import * as jwt_decode from 'jwt-decode';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { shareReplay, tap, catchError, mapTo, } from 'rxjs/operators';
import { Observable, of, Subject } from "rxjs";
import { config } from './../../config';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  private loggedUser: string;
  public loggedIn = new Subject<boolean>();
  decodedToken: { [key: string]: string };
  constructor(private http: HttpClient) {}

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.get<any>(`${config.apiUrl}login?email=${user.email}&password=${user.password}`)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  register(user: {userName: string, email: string, password: string }): Observable<boolean> {
    return this.http.get<any>(`${config.apiUrl}register?userName=${user.userName}&email=${user.email}&password=${user.password}`)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  doLoginUser(email: string, token: Tokens): void {
    this.loggedUser = email;
    this.storeTokens(token);
    this.loggedIn.next(true);
  }
  storeTokens(token: any) {
    localStorage.setItem(this.JWT_TOKEN, token.jwt)
    localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
  }

  logout() {
    this.doLogoutUser();
    //return this.http.post<any>(`${config.apiUrl}logout`, {
    //  'refreshToken': this.getRefreshToken()
    //}).pipe(
    //  tap(() => this.doLogoutUser()),
    //  mapTo(true),
    //  catchError(error => {
    //    alert(error.error);
    //    return of(false);
    //  }));
  }
  doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
    this.loggedIn.next(false);
  }
  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  getRefreshToken() {
    return this.http.post<any>(`${config.apiUrl}refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${config.apiUrl}refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }


  getJwtToken() {
    if (localStorage.getItem(this.JWT_TOKEN) == "undefined") { return null };
    var meToken = this.JWT_TOKEN;
    return localStorage.getItem(meToken);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  decodeToken() {
    var token = this.getJwtToken();
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
  }

  getUserId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.nameid : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {

    const expiryTime = Number(this.getExpiryTime());

    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }

}
