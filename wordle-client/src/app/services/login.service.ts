import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { CREATE_USER, LOGIN_USER } from "../ApiConstants";
import { UserModel } from "../Models/UserModel";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public userName = "";
  public isLoggedIn = false;

  constructor(
    private http: HttpClient
  ) {
    
  }

  public signUp(user: UserModel): Observable<any> {
    return this.http.post(CREATE_USER, user);
  }

  public logIn(user: UserModel): Observable<any> {
    return this.http.post(LOGIN_USER, user);
  }

}
