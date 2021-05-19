import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { SharedModule } from '../shared/shared.module';
import { StockReturnComponent } from './stock-return/stock-return.component';
import { TopUpStockComponent } from './top-up-stock/top-up-stock.component';
import { AddStockComponent } from './add-stock/add-stock.component';


@NgModule({
  declarations: [InventoryComponent, StockReturnComponent, TopUpStockComponent, AddStockComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule
  ]
})
export class InventoryModule { }
