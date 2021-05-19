import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = env.API_URL + 'login';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private router: Router, private http: HttpClient) { }

  isLoggedIn(){
    return this.isLoggedIn$.asObservable();
  }

  login(user: any){
    // this.http.post(this.url, {id: 12}, this.httpOptions).pipe(
    //   take(1)
    // ).subscribe((v) => {
    //   console.log(v);
    // })

    this.isLoggedIn$.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout(){
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

}
