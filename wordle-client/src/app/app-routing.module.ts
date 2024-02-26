import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, title: "Home", pathMatch: 'full',
    children: [
      { path: 'play', component: GamePageComponent, title: "Wordle", pathMatch: 'full' }
    ]},
  { path: 'play', component: GamePageComponent, title: "Wordle", pathMatch: 'full' },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
