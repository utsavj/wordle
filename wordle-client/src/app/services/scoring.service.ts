import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SUBMIT_SCORE } from '../ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  constructor(
    private http: HttpClient
  ) { }

  public submitScore(rowNumber: number) {
    this.http.post(SUBMIT_SCORE, rowNumber);
  }
}
