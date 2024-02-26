import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { CREATE_USER, IS_LOGGED_IN, LOGIN_USER, LOGOUT_USER } from "../ApiConstants";
import { UserModel } from "../Models/UserModel";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LoginSignupComponent } from "../components/home-page/login-signup/login-signup.component";

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
    private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginSignupComponent>
  ) {

  }

  public signUp(user: UserModel): Observable<any> {
    return this.http.post(CREATE_USER, user);
  }

  public logIn(user: UserModel): Observable<any> {
    return this.http.post(LOGIN_USER, user);
  }

  public logout() {
    return this.http.get(LOGOUT_USER);
  }

  public isUserLoggedIn() {
    this. http.get(IS_LOGGED_IN).subscribe((res: any) => {
      this.isLoggedIn = true;
      this.userName = res.name;
    });
  }

  public openDialog() {
    this.dialogRef = this.dialog.open(LoginSignupComponent);
  }

  public closeLoginPopup() {
    this.dialogRef.close();
  }

}
