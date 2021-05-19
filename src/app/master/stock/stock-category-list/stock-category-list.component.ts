import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { StockCategoryService } from 'src/app/services/stock-category.service';
import { IStockCatatory } from '../stock-category.interface';

@Component({
  selector: 'app-stock-category-list',
  templateUrl: './stock-category-list.component.html',
  styleUrls: ['./stock-category-list.component.css']
})
export class StockCategoryListComponent implements OnInit, OnDestroy {

  title = 'Stock Category List';
  productCategories: IStockCatatory[] = [];
  subscriptions: Subscription = new Subscription();
  checkedID: number[] = [];  
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private stockCat: StockCategoryService,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    const subscp = this.stockCat.getProductCategory().subscribe( productCategories => {
      this.productCategories = (productCategories as IStockCatatory[]);
      this.dtTrigger.next();      
    });
    this.subscriptions.add(subscp);
  }

  deleteMultipleRecords() {
    if (this.checkedID.length === 0) {
      alert('Please select atleast one record.');
    } else {
      if (confirm('Are you sure?')) {
        this.stockCat.deleteMultipleProductCat(this.checkedID).pipe(take(1)).subscribe(() => {
          this.notify.showSuccess('Records Deleted Successfully.', 'Success');
          const subscp = this.stockCat.getProductCategory().subscribe( productCategories => {
            this.productCategories = (productCategories as IStockCatatory[]);
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
      this.stockCat.deleteProductCat(id).pipe(take(1)).subscribe(() => {
        this.notify.showSuccess('Record Deleted Successfully.', 'Success');
        const subscp = this.stockCat.getProductCategory().subscribe( productCategories => {
          this.productCategories = (productCategories as IStockCatatory[]);
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
