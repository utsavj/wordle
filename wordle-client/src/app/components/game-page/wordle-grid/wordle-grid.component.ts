import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-wordle-grid",
  templateUrl: "./wordle-grid.component.html",
  styleUrls: ["./wordle-grid.component.scss"]
})

export class WordleGridComponent implements OnInit {

  @Input() public grid: [string[]] = [[]];
  @Input() public colorGrid: [string[]] = [[]];

  public gridSize;
  
  constructor() { 
    this.gridSize = Array(5).fill(0).map((x,i)=>i);
  }

  ngOnInit() {

  }
}
