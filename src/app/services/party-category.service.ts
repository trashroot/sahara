import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment as env} from '../../environments/environment';
import { IPartCatatory } from '../master/part-category/party-category.interface';

@Injectable({
  providedIn: 'root'
})
export class PartyCategoryService {

  private headers = {headers: new HttpHeaders(
      {'Content-Type': 'application/json; charset=utf-8'}
    )};
  private url: string = env.API_URL + 'party-category';
  constructor(private _http: HttpClient) { }

  getPartyCategory(){
    return this._http.get(this.url);
  }

  getPartyCategoryById(id: number){
    const uUrl = `${this.url}/${id}`;
    return this._http.get(uUrl);
  }

  addPartyCategory(val: IPartCatatory[]){
    return this._http.post(this.url, val).pipe(
      catchError(this.handleError)
    );
  }

  updatePartyCategory(val: IPartCatatory){
    return this._http.put(this.url, val, this.headers).pipe(
      catchError(this.handleError)
    );
  }

  deleteMultiplePartyCat(val: number[]){
    return this._http.post(this.url + '/mdelete', val).pipe(
      catchError(this.handleError)
    );
  }

  deletePartyCat(id: number){
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

