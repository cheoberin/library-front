import { Injectable } from '@angular/core';
import {Observable, switchMap, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {SingInRequest} from "../../../core/models/User";
import {environment} from "../../../../environments/environment";
import {CurrentUserService} from "./CurrentUser.service";
import {JwtService} from "../jwt/jwt.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router,private currentUserService:CurrentUserService ,private jwtService:JwtService) {}

  signIn(singInRequest : SingInRequest) {
    return this.http.post<any>(`${this.endpoint}/auth/login`, singInRequest)
      .pipe(
        switchMap((loginRes) => {
          localStorage.setItem('access_token', loginRes.token); // Salva o token no localStorage
          return this.http.get(`${this.endpoint}/user/getUser/${singInRequest.email}`);
        })
      )
      .subscribe((userRes) => {
        this.currentUserService.setCurrentUser(userRes);
        this.router.navigate(['']);
      });
  }

  getCurrentUser(){
    return localStorage.getItem('current_user');
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }
  get isPermited():boolean{
    let rawToken = localStorage.getItem('access_token');
    if(rawToken) {
      let decodedToken = this.jwtService.DecodeToken(rawToken);
      return decodedToken.roles.includes('ADMIN') || decodedToken.roles.includes('EMPLOYEE')
    }
    return false;
  }

  get isAdmin():boolean{
    let rawToken = localStorage.getItem('access_token');
    if(rawToken) {
      let decodedToken = this.jwtService.DecodeToken(rawToken);
      return decodedToken.roles.includes('ADMIN')
    }
    return false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeUser = localStorage.removeItem('current_user');
    if (removeToken == null && removeUser == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  getUserProfile(id: string): Observable<any> {
    let api = `${this.endpoint}/user/getUser/${id}`;
    return this.http.get(api);
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }



}
