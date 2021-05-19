import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStockComponent } from './add-stock/add-stock.component';

import { InventoryComponent } from './inventory/inventory.component';
import { StockReturnComponent } from './stock-return/stock-return.component';
import { TopUpStockComponent } from './top-up-stock/top-up-stock.component';

const routes: Routes = [
  { path: 'stock-top-up', component: TopUpStockComponent },
  { path: 'stock-return', component: StockReturnComponent },
  { path: 'add', component: AddStockComponent },
  { path: '', component: InventoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
