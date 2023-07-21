import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from './components/home-page/logout/logout.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wordle';

  constructor(
    public dialog: MatDialog
  ) {

  }

  public openLogoutComponent() {
    this.dialog.open(LogoutComponent, {panelClass: "logoutDialog"});
  }

  public openInstructionsComponent() {
    this.dialog.open(InstructionsComponent);
  }
}
