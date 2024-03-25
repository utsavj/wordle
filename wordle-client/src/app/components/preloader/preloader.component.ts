import { Component, OnInit } from "@angular/core";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: "app-preloader",
  templateUrl: "./preloader.component.html",
  styleUrls: ["./preloader.component.scss"],
  standalone: true,
  imports: [MatProgressSpinnerModule]
})

export class PreloaderComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }
}
