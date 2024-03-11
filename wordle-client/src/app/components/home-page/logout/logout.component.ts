import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})

export class LogoutComponent implements OnInit {

  public name = "";

  constructor(
    public loginService: LoginService,
    public dialogRef: MatDialogRef<LogoutComponent>
  ) {
  }

  ngOnInit() {
    const userAccountIcon = document.getElementById('user-account-icon');
    const topPos = userAccountIcon?.getBoundingClientRect().top;
    const rightPos = userAccountIcon?.getBoundingClientRect().left;
    let accountContainer = document.getElementById('account-container');
    if (accountContainer && topPos && rightPos) {
      accountContainer.style.top = (topPos+10).toString();
      accountContainer.style.right = (rightPos).toString();
    }
  }

  public logoutReq() {
    this.loginService.logout().subscribe(res => {
      this.loginService.userName = "";
      this.loginService.isLoggedIn = false;
      this.dialogRef.close();
    });
  }

  public loginDialog() {
    this.loginService.openDialog();
  }
}
