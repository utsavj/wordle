import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { CREATE_USER } from "../ApiConstants";
import { UserModel } from "../Models/UserModel";

/**
 * @description
 * @class
 */
@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient
  ) {
    
  }

  public signUp(user: UserModel): Observable<any> {
    return this.http.post(CREATE_USER, user);
  }

}
