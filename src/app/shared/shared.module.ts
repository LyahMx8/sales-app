import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalSalesComponent } from './total-sales/total-sales.component';
import { FilterSalesComponent } from './filter-sales/filter-sales.component';
import { SalesListComponent } from './sales-list/sales-list.component';



@NgModule({
  declarations: [
    TotalSalesComponent,
    FilterSalesComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TotalSalesComponent,
    FilterSalesComponent,
    SalesListComponent
  ]
})
export class SharedModule { }
