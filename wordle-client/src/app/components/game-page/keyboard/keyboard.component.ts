import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.scss"]
})

export class KeyboardComponent implements OnInit {

  @Output() public enteredCharacter: EventEmitter<string> = new EventEmitter<string>;

  public keyboardBtnLine1 = ["Q","W","E","R","T","Y","U","I","O","P"];
  public keyboardBtnLine2 = ["A","S","D","F","G","H","J","K","L"];
  public keyboardBtnLine3 = ["ENTER","Z","X","C","V","B","N","M","CLEAR"];

  constructor() { 

  }

  ngOnInit() {

  }

  public keyboardBtnClicked(btn: string) {
    this.enteredCharacter.emit(btn);
  }
}
