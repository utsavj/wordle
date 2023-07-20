import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

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
  public loginForm: FormGroup;
  public signupForm: FormGroup;

  constructor(
    fb: FormBuilder
  ) { 
    this.loginForm = fb.group({email: "", password: ""});
    this.signupForm = fb.group({name: "", email: "", password: ""});
  }

  ngOnInit() {

  }

  public SignUpReq() {
    console.log(this.name.value);
    console.log(this.email.value);
    console.log(this.password.value);
  }

  public LogInReq() {
    console.log(this.email.value);
    console.log(this.password.value);
  }
}
