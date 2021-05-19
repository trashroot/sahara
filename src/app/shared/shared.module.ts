import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardNavComponent } from '../dashboard-nav/dashboard-nav.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
  declarations: [
    DashboardNavComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardNavComponent,
    DataTablesModule,
    AppMaterialModule
  ]
})
export class SharedModule { }
