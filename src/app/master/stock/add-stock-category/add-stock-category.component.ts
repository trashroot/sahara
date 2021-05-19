import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { StockCategoryService } from 'src/app/services/stock-category.service';
import { IStockCatatory } from '../stock-category.interface';

@Component({
  selector: 'app-add-stock-category',
  templateUrl: './add-stock-category.component.html',
  styleUrls: ['./add-stock-category.component.css']
})
export class AddStockCategoryComponent implements OnInit {
  
  title = 'Add New Stock Category';
  newRow: IStockCatatory[] = [];  
  stockCategoryForm = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    IsActive: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private router: Router,
    private stockCat: StockCategoryService
    ) { }
  
  ngOnInit(): void {
  }

  addStockCategory(){
    this.newRow.push(this.stockCategoryForm.value);
    this.stockCat.addProductCategory(this.newRow).subscribe(() =>  {
      this.notify.showSuccess('Record Added Sucessfully.', 'Success');
      this.router.navigate(['/master/stock-category']);
    });
  }

}
