import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.scss"]
})

export class KeyboardComponent implements OnInit {

  @Output() public enteredCharacterEmitter: EventEmitter<string> = new EventEmitter<string>;
  @Output() public checkGuessWordEmitter: EventEmitter<any> = new EventEmitter<any>;
  @Output() public clearLastCharacterEmitter: EventEmitter<any> = new EventEmitter<any>;

  public keyboardBtnLine1 = ["Q","W","E","R","T","Y","U","I","O","P"];
  public keyboardBtnLine2 = ["A","S","D","F","G","H","J","K","L"];
  public keyboardBtnLine3 = ["ENTER","Z","X","C","V","B","N","M","CLEAR"];

  constructor() { 

  }

  ngOnInit() {

  }

  public keyboardBtnClicked(btn: string) {
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

  public checkGuessWord() {
    this.checkGuessWordEmitter.emit();
  }

  public clearLastCharacter() {
    this.clearLastCharacterEmitter.emit();
  }
}
