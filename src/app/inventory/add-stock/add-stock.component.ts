import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import { IInventory } from '../inventory.interface';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit, OnDestroy {

  title = 'Add Stock';
  newRow: IInventory[] = [];  
  newForm = this.fb.group({
    Name: ['', Validators.required],
    StockCategorySNo: ['', Validators.required],
    Quantity: ['', Validators.required],
    Weight: ['', Validators.required],
    BatchNo: ['', Validators.required],
    PurchaseRate: ['', Validators.required],
    MrpRate: ['', Validators.required],
    SellingRate: ['', Validators.required],
    SellingMargin: ['', Validators.required],
    Discount: ['', Validators.required],
    CGSTSNo: ['', Validators.required],
    SGSTSNo: ['', Validators.required],
    ManufactureDate: ['', Validators.required],
    ExpiryDate: ['', Validators.required],
    LowStockQty: ['', Validators.required],
    HighStockQty: ['', Validators.required],
    IsActive: ['', Validators.required]
  });

  constructor(
    private fb:FormBuilder,
    private _service: InventoryService

  ) { }

  ngOnInit(): void {
  }

  add(){

  }

  ngOnDestroy(){

  }

}
