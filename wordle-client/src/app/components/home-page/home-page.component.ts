import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { InstructionsComponent } from "../instructions/instructions.component";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})

export class HomePageComponent implements OnInit {
  
  constructor(
    public dialog: MatDialog
  ) { 

  }

  ngOnInit() {

  }

  public openLoginDialog() {
    this.dialog.open(LoginSignupComponent);
  }

  public openInstructionsDialog() {
    this.dialog.open(InstructionsComponent);
  }
}
