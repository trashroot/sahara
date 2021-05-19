import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { StockCategoryService } from 'src/app/services/stock-category.service';
import { IStockCatatory } from '../stock-category.interface';

@Component({
  selector: 'app-edit-stock-category',
  templateUrl: './edit-stock-category.component.html',
  styleUrls: ['./edit-stock-category.component.css']
})
export class EditStockCategoryComponent implements OnInit {

  title = 'Edit Stock Category';
  productCatDetails: IStockCatatory[] = [];
  productCatForm = this.fb.group({
    SNo: [''],
    code: ['', Validators.required],
    name: ['', Validators.required],
    status: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private navigate: Router,
    private stockCat: StockCategoryService,
    private notify: NotificationService
    ) { }

  ngOnInit(): void {
    let updateProductCategory:any = this.router.snapshot.paramMap.get('id');
    this.stockCat.getProductCategoryById(updateProductCategory).subscribe( x => {
      const data = x as IStockCatatory[];
      this.productCatForm = this.fb.group({
        SNo: [data[0].id],
        code: [data[0].Code, Validators.required],
        name: [data[0].Name, Validators.required],
        status: [data[0].IsActive ? 1 : 0, Validators.required],
      });
    });
  }

  edit(){
    this.stockCat.updateProductCategory(this.productCatForm.value).subscribe(() => {
      this.notify.showSuccess('Records updated successfully', 'Success');
      this.navigate.navigate(['/master/stock-category']);
    });
  }

}
