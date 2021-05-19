import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { PartyService } from 'src/app/services/party.service';
import { IParty } from '../party.interface';

@Component({
  selector: 'app-party-master',
  templateUrl: './party-master.component.html',
  styleUrls: ['./party-master.component.css']
})
export class PartyMasterComponent implements OnInit, OnDestroy {

  title = 'Party List';
  parties: IParty[] = [];
  subscriptions: Subscription = new Subscription();
  checkedID: number[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private party: PartyService, private notify: NotificationService) { }

  ngOnInit(): void {
    const subscp = this.party.getParty().subscribe( parties => {
      this.parties = (parties as IParty[]);
      this.dtTrigger.next();
    });
    this.subscriptions.add(subscp);
  }

  deleteMultipleRecords() {
    if (this.checkedID.length === 0) {
      alert('Please select atleast one record.');
    } else {
      if (confirm('Are you sure?')) {
        this.party.deleteMultipleParty(this.checkedID).pipe(take(1)).subscribe(() => {
          this.notify.showSuccess('Records Deleted Successfully.', 'Success');
          const subscp = this.party.getParty().subscribe( parties => {
            this.parties = (parties as IParty[]);
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
      this.party.deleteParty(id).pipe(take(1)).subscribe(() => {
        this.notify.showSuccess('Record Deleted Successfully.', 'Success');
        const subscp = this.party.getParty().subscribe( parties => {
          this.parties = (parties as IParty[]);
        });
        this.subscriptions.add(subscp);
      });
    }
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
