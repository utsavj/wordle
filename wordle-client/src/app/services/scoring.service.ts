import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SUBMIT_SCORE } from '../ApiConstants';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  public submitScore(rowNumber: number): Observable<any> {
    return this.http.post(SUBMIT_SCORE, rowNumber);
  }
}
