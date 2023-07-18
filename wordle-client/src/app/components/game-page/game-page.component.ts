import { Component, HostListener, OnInit } from "@angular/core";
import { allowedWords } from "D:/Projects/Wordle/wordle-client/src/words";
import { wordleWords } from "D:/Projects/Wordle/wordle-client/src/wordleWords";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

const REGEX_ALPHABET = "/^[A-Za-z]+$/";
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
  public incorrectLetters: Map<string, string>;
  public wordleWords = wordleWords;


  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { 
      this.incorrectLetters = new Map<string, string>();
      this.guessedCorrect = false;
  }

  ngOnInit() {
    this.wordleWord = this.wordleWords[Math.floor(Math.random()*(this.wordleWords.length - 1))];
    console.log(this.wordleWord);
    this.colorGrid = this.createColorGrid(6, 5, "");
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.guessedCorrect) {
      switch (event.key) {
        case "Enter":
          this.checkGuessWord();
          break;
        case "Backspace":
          this.clearLastCharacter();
          break;
        default:
          if (this.isAlphabet(event.key.toLowerCase())) {
            this.updateCharacterList(event.key);
          }
      }
    }
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
          this.openSuccessDialog();
        } else {
          let indexOfCorrectLetter: number = -1;
          const wordleArray: string[]= this.generateArrayFromString(this.wordleWord);

          activeRow.forEach((letter: string, indexInGuessWord: number) => {
            indexOfCorrectLetter = wordleArray.indexOf(letter.toLowerCase());

            if (indexOfCorrectLetter >= 0 && wordleArray[indexInGuessWord] === letter) {
              wordleArray[indexOfCorrectLetter] = "";
              this.colorGrid[this.activeGridRow][indexOfCorrectLetter] = "correct-pos";
            }
          });

          activeRow.forEach((letter: string, indexInGuessWord: number) => {
            indexOfCorrectLetter = wordleArray.indexOf(letter.toLowerCase());

            if (indexOfCorrectLetter >= 0
              && this.colorGrid[this.activeGridRow][indexInGuessWord] != "correct-pos") {
              wordleArray[indexOfCorrectLetter] = "";
              this.colorGrid[this.activeGridRow][indexInGuessWord] = "character-present"
            }
          });

          activeRow.forEach((letter: string, indexInGuessWord: number) => {
            indexOfCorrectLetter = this.wordleWord.indexOf(letter.toLowerCase());

            if (indexOfCorrectLetter == -1) {
              this.incorrectLetters.set(letter.toUpperCase(), "incorrect-guess");
            }
          });
        }
        if (activeRow.length <= 5) {
          this.grid.push([]);
          this.activeGridRow++;
        }
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

  public isAlphabet(key: string) {
    return key >= 'a' && key <= 'z' && key.length == 1;
  }

  public generateArrayFromString(word: string): string[] {
    let wordArray: string[] = [];
    for (let i = 0; i < word.length; i++) {
      wordArray.push(word[i]);
    }
    return wordArray;
  }
}
