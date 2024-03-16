import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.scss"]
})

export class KeyboardComponent implements OnInit {

  @Input() public incorrectLetters: Map<string, string> = new Map<string, string>();
  @Input() public guessedCorrect: boolean = false;
  @Output() public enteredCharacterEmitter: EventEmitter<string> = new EventEmitter<string>;
  @Output() public checkGuessWordEmitter: EventEmitter<any> = new EventEmitter<any>;
  @Output() public clearLastCharacterEmitter: EventEmitter<any> = new EventEmitter<any>;

  public keyboardBtnLine1 = ["Q","W","E","R","T","Y","U","I","O","P"];
  public keyboardBtnLine2 = ["A","S","D","F","G","H","J","K","L"];
  public keyboardBtnLine3 = ["CLEAR","Z","X","C","V","B","N","M","ENTER"];

  constructor() {

  }

  ngOnInit() {

  }

  public keyboardBtnClicked(btn: string) {
    if (!this.guessedCorrect) {
      switch (btn) {
        case "ENTER":
          this.checkGuessWord();
          break;
        case "CLEAR":
            this.clearLastCharacter();
            break;
        default:
          this.enteredCharacterEmitter.emit(btn);
          break;
      }
    }
  }

  public checkGuessWord() {
    this.checkGuessWordEmitter.emit();
  }

  public clearLastCharacter() {
    this.clearLastCharacterEmitter.emit();
  }
}
