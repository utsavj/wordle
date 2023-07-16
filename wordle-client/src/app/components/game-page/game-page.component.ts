import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"]
})

export class GamePageComponent implements OnInit {
  
  public enteredCharacter: string = "";
  public activeGridRow = 0;
  public grid: [string[]] = [[]];


  constructor() { 
    
  }

  ngOnInit() {

  }

  public updateCharacterList(enteredCharacter: string) {
    if (this.grid[this.activeGridRow].length < 5) {
      this.grid[this.activeGridRow].push(enteredCharacter);
    }
  }
}
