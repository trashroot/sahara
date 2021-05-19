import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { InventoryService } from 'src/app/services/inventory.service';
import { NotificationService } from 'src/app/services/notification.service';
import { IInventory } from '../inventory.interface';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  title: string = 'Stock'
  inventory: IInventory[] = [];
  subscriptions: Subscription = new Subscription();
  checkedID: number[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _invt: InventoryService,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    const subscp = this._invt.getInventory().subscribe( invt => {
      this.inventory = (invt as IInventory[]);
      this.dtTrigger.next();      
    });
    this.subscriptions.add(subscp);
  }

  deleteMultipleRecords() {
    if (this.checkedID.length === 0) {
      alert('Please select atleast one record.');
    } else {
      if (confirm('Are you sure?')) {
        this._invt.deleteMultipleInventory(this.checkedID).pipe(take(1)).subscribe(() => {
          this.notify.showSuccess('Records Deleted Successfully.', 'Success');
          const subscp = this._invt.getInventory().subscribe( gstRates => {
            this.inventory = (gstRates as IInventory[]);
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
      this._invt.deleteInventory(id).pipe(take(1)).subscribe(() => {
        this.notify.showSuccess('Record Deleted Successfully.', 'Success');
        const subscp = this._invt.getInventory().subscribe( gstRates => {
          this.inventory = (gstRates as IInventory[]);
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
