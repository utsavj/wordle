import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginSignupComponent } from "src/app/components/home-page/login-signup/login-signup.component";
import { InstructionsComponent } from "src/app/components/instructions/instructions.component";
import { PerformanceChartComponent } from "src/app/performance-chart/performance-chart.component";
import { LoginService } from "src/app/services/login.service";
import { PreloaderService } from "src/app/services/preloader.service";
import { ScoringService } from "src/app/services/scoring.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})

export class HomePageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public loginService: LoginService,
    public scoringService: ScoringService,
    public preloaderService: PreloaderService
  ) {

  }

  ngOnInit() {

  }

  public openLoginDialog() {
    this.loginService.openDialog();
  }

  public openInstructionsDialog() {
    this.dialog.open(InstructionsComponent);
  }

  public openPerformanceDialog() {
    this.preloaderService.show();
    this.scoringService.getScore().subscribe(res => {
      this.preloaderService.hide();
      if (!!res){
        this.dialog.open(PerformanceChartComponent, {data: res});
      }
    },
    err => {
      this.preloaderService.hide();
    });
  }
}
