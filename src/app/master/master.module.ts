import { NgModule } from '@angular/core';

import { MasterRoutingModule } from './master-routing.module';
import { PartyCategoryListComponent } from './part-category/party-category-list/party-category-list.component';
import { AddPartyCategoryComponent } from './part-category/add-party-category/add-party-category.component';
import { EditPartyCategoryComponent } from './part-category/edit-party-category/edit-party-category.component';
import { SharedModule } from '../shared/shared.module';
import { PartyMasterComponent } from './party/party-master/party-master.component';
import { AddPartyComponent } from './party/add-party/add-party.component';
import { EditPartyComponent } from './party/edit-party/edit-party.component';
import { StockCategoryListComponent } from './stock/stock-category-list/stock-category-list.component';
import { AddStockCategoryComponent } from './stock/add-stock-category/add-stock-category.component';
import { EditStockCategoryComponent } from './stock/edit-stock-category/edit-stock-category.component';
import { GstComponent } from './gst/gst/gst.component';
import { AddGstComponent } from './gst/add-gst/add-gst.component';
import { EditGstComponent } from './gst/edit-gst/edit-gst.component';

@NgModule({
  declarations: [
    PartyCategoryListComponent,
    AddPartyCategoryComponent,
    EditPartyCategoryComponent,
    PartyMasterComponent, 
    AddPartyComponent, 
    EditPartyComponent, 
    StockCategoryListComponent, 
    AddStockCategoryComponent, 
    EditStockCategoryComponent, 
    GstComponent, 
    AddGstComponent, 
    EditGstComponent,
  ],
  imports: [
    MasterRoutingModule,
    SharedModule,
  ]
})
export class MasterModule { }
