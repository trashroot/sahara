import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment as env} from '../../environments/environment';
import { IStockCatatory } from '../master/stock/stock-category.interface';

@Injectable({
  providedIn: 'root'
})
export class StockCategoryService {

  private headers = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json; charset=utf-8' }
    )
  };
  private url: string = env.API_URL + 'product-category';
  constructor(private _http: HttpClient) { }

  getProductCategory() {
    return this._http.get(this.url);
  }

  getProductCategoryById(id: number) {
    const uUrl = `${this.url}/${id}`;
    return this._http.get(uUrl);
  }

  addProductCategory(val: IStockCatatory[]) {
    return this._http.post(this.url, val).pipe(
      catchError(this.handleError)
    );
  }

  updateProductCategory(val: IStockCatatory) {
    return this._http.put(this.url, val, this.headers).pipe(
      catchError(this.handleError)
    );
  }

  deleteMultipleProductCat(val: number[]) {
    return this._http.post(this.url + '/mdelete', val).pipe(
      catchError(this.handleError)
    );
  }

  deleteProductCat(id: number) {
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
