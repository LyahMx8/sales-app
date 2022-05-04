import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';

import localePy from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePy, 'es-CO');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
