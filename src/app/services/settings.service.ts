import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment as env} from '../../environments/environment';
import { ISettings } from '../settings/settings/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private headers = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json; charset=utf-8' }
    )
  };
  private url: string = env.API_URL + 'settings';
  constructor(private _http: HttpClient) { }

  getSettings() {
    return this._http.get(this.url);
  }

  updateSettings(val: ISettings) {
    return this._http.put(this.url, val, this.headers).pipe(
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
