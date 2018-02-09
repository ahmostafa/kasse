import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZuZhalenComponent } from './zu-zhalen/zu-zhalen.component';
import { SuggestedAmountComponent } from './suggested-amount/suggested-amount.component';


@NgModule({
  declarations: [
    AppComponent,
    ZuZhalenComponent,
    SuggestedAmountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
