import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TotalSalesComponent } from './total-sales/total-sales.component';
import { FilterSalesComponent } from './filter-sales/filter-sales.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePy from '@angular/common/locales/es';
registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    TotalSalesComponent,
    FilterSalesComponent,
    SalesListComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TotalSalesComponent,
    FilterSalesComponent,
    SalesListComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ]
})
export class SharedModule { }
