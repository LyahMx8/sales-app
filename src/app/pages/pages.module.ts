import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core/core.module';
import { MyBusinessComponent } from './my-business/my-business.component';

import { SharedModule } from '@core/shared/shared.module';

@NgModule({
  declarations: [
    MyBusinessComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ]
})

export class PagesModule { }
