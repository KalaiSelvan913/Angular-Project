import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerViewComponent,
    CustomerAddComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    isDevMode() ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
