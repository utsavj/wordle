import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { WordleGridComponent } from './components/game-page/wordle-grid/wordle-grid.component';
import { KeyboardComponent } from './components/game-page/keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    WordleGridComponent,
    KeyboardComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
