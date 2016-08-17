import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { CalcModule } from './calc/calc.module';
import { SharedModule } from './shared/shared.module';
// import { Store } from '@ngrx/store';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes),
    CalcModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
