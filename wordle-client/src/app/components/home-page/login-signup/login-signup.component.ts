import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserModel } from "src/app/Models/UserModel";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login-signup",
  templateUrl: "./login-signup.component.html",
  styleUrls: ["./login-signup.component.scss"]
})

export class LoginSignupComponent implements OnInit {

  public errorMsg = "You must enter valid value";
  public name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public user: UserModel = new UserModel();
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public hideLoginPassword = true;
  public hideSignupPassword = true;

  constructor(
    fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = fb.group({email: "", password: ""});
    this.signupForm = fb.group({name: "", email: "", password: ""});
  }

  ngOnInit() {

  }

  public SignUpReq() {
    this.user.import(this.name.value, this.email.value, this.password.value);
    this.loginService.signUp(this.user).subscribe((res) => {
      this.loginService.userName = res.name;
      this.loginService.isLoggedIn = true;
      this.loginService.closeLoginPopup();
    });
  }

  public LogInReq() {
    this.user.import("", this.email.value, this.password.value);
    this.loginService.logIn(this.user).subscribe((res) => {
      this.loginService.userName = res.name;
      this.loginService.isLoggedIn = true;
      this.loginService.closeLoginPopup();
    });
  }
}
