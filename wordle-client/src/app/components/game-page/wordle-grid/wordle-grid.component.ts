import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-wordle-grid",
  templateUrl: "./wordle-grid.component.html",
  styleUrls: ["./wordle-grid.component.scss"]
})

export class WordleGridComponent implements OnInit {

  @Input() public grid: [string[]] = [[]];
  @Input() public colorGrid: [string[]] = [[]];

  public gridWidth: number[];
  public gridHeight: number[];
  
  constructor() { 
    this.gridWidth = Array(5).fill(0).map((x,i)=>i);
    this.gridHeight = Array(6).fill(0).map((x,i)=>i);
  }

  ngOnInit() {

  }
}
