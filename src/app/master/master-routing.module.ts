import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartyCategoryListComponent } from './part-category/party-category-list/party-category-list.component';
import { AddPartyCategoryComponent } from './part-category/add-party-category/add-party-category.component';
import { EditPartyCategoryComponent } from './part-category/edit-party-category/edit-party-category.component';
import { PartyMasterComponent } from './party/party-master/party-master.component';
import { AddPartyComponent } from './party/add-party/add-party.component';
import { EditPartyComponent } from './party/edit-party/edit-party.component';
import { StockCategoryListComponent } from './stock/stock-category-list/stock-category-list.component';
import { AddStockCategoryComponent } from './stock/add-stock-category/add-stock-category.component';
import { EditStockCategoryComponent } from './stock/edit-stock-category/edit-stock-category.component';
import { GstComponent } from './gst/gst/gst.component';
import { AddGstComponent } from './gst/add-gst/add-gst.component';
import { EditGstComponent } from './gst/edit-gst/edit-gst.component';
// import { PartyCatResolveService } from '../services/party-cat-resolve.service';

const routes: Routes = [
  {
    path: 'party-category',
    component: PartyCategoryListComponent
  },
  {
    path: 'party-category/add',
    component: AddPartyCategoryComponent
  },
  {
    path: 'party-category/edit/:id',
    component: EditPartyCategoryComponent
  },
  {
    path: 'party-list',
    component: PartyMasterComponent
  },
  {
    path: 'party-list/add',
    component: AddPartyComponent
  },
  {
    path: 'party-list/edit/:id',
    component: EditPartyComponent
  },
  {
    path: 'stock-category',
    component: StockCategoryListComponent
  },
  {
    path: 'stock-category/add',
    component: AddStockCategoryComponent
  },
  {
    path: 'stock-category/edit/:id',
    component: EditStockCategoryComponent
  },
  {
    path: 'gst',
    component: GstComponent
  },
  {
    path: 'gst/add',
    component: AddGstComponent
  },
  {
    path: 'gst/edit/:id',
    component: EditGstComponent
  },
  { path: '', redirectTo : 'party-category', pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
