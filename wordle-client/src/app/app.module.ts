import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { WordleGridComponent } from './components/game-page/wordle-grid/wordle-grid.component';
import { KeyboardComponent } from './components/game-page/keyboard/keyboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginSignupComponent } from './components/home-page/login-signup/login-signup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LogoutComponent } from './components/home-page/logout/logout.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    WordleGridComponent,
    KeyboardComponent,
    GamePageComponent,
    HomePageComponent,
    PageNotFoundComponent,
    LoginSignupComponent,
    LogoutComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [{provide: MatDialogRef, useValue:{}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
