import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { PartyCategoryService } from 'src/app/services/party-category.service';
import { IPartCatatory } from '../party-category.interface';

@Component({
  selector: 'app-party-category-list',
  templateUrl: './party-category-list.component.html',
  styleUrls: ['./party-category-list.component.css']
})
export class PartyCategoryListComponent implements OnInit, OnDestroy {

  title = 'Party Category List';
  partCatList$: Observable<IPartCatatory[]> = new Observable<IPartCatatory[]>();
  checkedID: number[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private partCat: PartyCategoryService,
    private notify: NotificationService
  ) { }

  ngOnInit() {
    this.partCatList$ = this.partCat.getPartyCategory().pipe(
      map(response => {
        this.dtTrigger.next();
        return response as IPartCatatory[];
      })
    );

  }

  deleteMultipleRecords() {
    if (this.checkedID.length == 0) {
      alert('Please select atleast one record.');
    } else {
      if (confirm('Are you sure?')) {
        // console.log(this.checkedID);
        this.partCat.deleteMultiplePartyCat(this.checkedID).pipe(take(1)).subscribe(() => {
          this.notify.showSuccess('Records Deleted Successfully.', 'Success');
          this.partCatList$ = this.partCat.getPartyCategory().pipe(
            map(response => response as IPartCatatory[])
          );
        });
      }
    }
  }

  changeSelection(event: Event, val: number) {
    const checkBox = event.target as HTMLInputElement;
    if (checkBox.checked) {
      this.checkedID.push(val);
    }

    if (checkBox.checked === false) {
      const index = this.checkedID.indexOf(val);
      if (index > -1) {
        this.checkedID.splice(index, 1);
      }
    }
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.partCat.deletePartyCat(id).pipe(take(1)).subscribe(() => {
        this.notify.showSuccess('Record Deleted Successfully.', 'Success');
        this.partCatList$ = this.partCat.getPartyCategory().pipe(
          map(response => response as IPartCatatory[])
        );
      });
    }
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}

