import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { IParty } from '../master/party/party.interface';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  private headers = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json; charset=utf-8' }
    )
  };
  private url: string = env.API_URL + 'party';
  constructor(private _http: HttpClient) { }

  getParty() {
    return this._http.get(this.url);
  }

  getPartyById(id: number) {
    const uUrl = `${this.url}/${id}`;
    return this._http.get(uUrl);
  }

  addParty(val: IParty[]) {
    return this._http.post(this.url, val).pipe(
      catchError(this.handleError)
    );
  }

  updateParty(val: IParty) {
    return this._http.put(this.url, val, this.headers).pipe(
      catchError(this.handleError)
    );
  }

  deleteMultipleParty(val: number[]) {
    return this._http.post(this.url + '/mdelete', val).pipe(
      catchError(this.handleError)
    );
  }

  deleteParty(id: number) {
    const dUrl = `${this.url}/${id}`;
    return this._http.delete(dUrl).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
