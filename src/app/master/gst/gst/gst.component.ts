import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { GstService } from 'src/app/services/gst.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IGST } from '../gst.interface';
@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit, OnDestroy {

  title = 'GST Rate List';
  gstRates: IGST[] = [];
  subscriptions: Subscription = new Subscription();
  checkedID: number[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private gst: GstService,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    const subscp = this.gst.getGstRate().subscribe( gstRates => {
      this.gstRates = (gstRates as IGST[]);
      this.dtTrigger.next();      
    });
    this.subscriptions.add(subscp);
  }

  deleteMultipleRecords() {
    if (this.checkedID.length === 0) {
      alert('Please select atleast one record.');
    } else {
      if (confirm('Are you sure?')) {
        this.gst.deleteMultipleGstRate(this.checkedID).pipe(take(1)).subscribe(() => {
          this.notify.showSuccess('Records Deleted Successfully.', 'Success');
          const subscp = this.gst.getGstRate().subscribe( gstRates => {
            this.gstRates = (gstRates as IGST[]);
          });
          this.subscriptions.add(subscp);
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
      this.gst.deleteGstRate(id).pipe(take(1)).subscribe(() => {
        this.notify.showSuccess('Record Deleted Successfully.', 'Success');
        const subscp = this.gst.getGstRate().subscribe( gstRates => {
          this.gstRates = (gstRates as IGST[]);
        });
        this.subscriptions.add(subscp);
      });
    }
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
    this.subscriptions.unsubscribe()
  }

}
