import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PartyCategoryService } from './party-category.service';
import { map } from 'rxjs/operators';
import { IPartCatatory } from '../master/part-category/party-category.interface'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyCatResolveService implements Resolve<IPartCatatory[]> {

  constructor(private partyCat: PartyCategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.partyCat.getPartyCategory()
  }
}
