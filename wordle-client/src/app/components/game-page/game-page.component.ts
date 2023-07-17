import { Component, OnInit } from "@angular/core";
import { allowedWords } from "D:/Projects/Wordle/wordle-client/src/words";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"]
})

export class GamePageComponent implements OnInit {
  
  public enteredCharacter: string = "";
  public activeGridRow = 0;
  public grid: [string[]] = [[]];
  public colorGrid: [string[]] = [[]];
  public allowedWords = allowedWords;
  public wordleWord: string = "";
  public guessedCorrect: boolean = false;


  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { 
    
  }

  ngOnInit() {
    this.wordleWord = this.allowedWords[Math.floor(Math.random()*(this.allowedWords.length - 1))];
    console.log(this.wordleWord);
    this.colorGrid = this.createColorGrid(5, 5, "");
  }

  public updateCharacterList(enteredCharacter: string) {
    if (this.grid[this.activeGridRow].length < 5) {
      this.grid[this.activeGridRow].push(enteredCharacter);
    }
  }

  public checkGuessWord() {
    const activeRow = this.grid[this.activeGridRow];
    
    if(activeRow.length === 5) {
      if (!this.allowedWords.includes(activeRow.join('').toLowerCase())) {
        this.openUnsuccessSnackbar("Not in word list", "OK", {duration: 2000});
      } else {
        if (this.wordleWord === activeRow.join('').toLowerCase()) {
          this.guessedCorrect = true;
          this.colorGrid[this.activeGridRow].forEach(letter => letter = "correct-pos");
          console.log(this.guessedCorrect);
          this.openSuccessDialog();
        } else {
          let indexOfCorrectLetter: number = -1;
          activeRow.forEach((letter: string, indexInGuessWord: number) => {
            indexOfCorrectLetter = this.wordleWord.indexOf(letter.toLowerCase());

            if (indexOfCorrectLetter >= 0) {
              this.colorGrid[this.activeGridRow][indexInGuessWord] = "character-present"
            }

            if (activeRow[indexOfCorrectLetter] === letter) {
              this.colorGrid[this.activeGridRow][indexOfCorrectLetter] = "correct-pos";
            }
          });
        }
        this.grid.push([]);
        this.activeGridRow++;
      }
    }
  }

  public clearLastCharacter() {
    if (this.grid[this.activeGridRow].length >= 0) {
      this.grid[this.activeGridRow].pop();
    }
  }

  public openSuccessDialog() {
    this.dialog.open(SuccessDialogComponent);
  }

  public createColorGrid(h: number, w: number, val: string) {
    let arr: [string[]] = [[]];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
  }

  public openUnsuccessSnackbar(message: string, action: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }
}
