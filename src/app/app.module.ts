import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZuZhalenComponent } from './zu-zhalen/zu-zhalen.component';
import { SuggestedAmountComponent } from './suggested-amount/suggested-amount.component';
import { BezhalungService } from './services/bezhalung.service';
import { GegebenService } from './services/gegeben.service';
import { BezahlungTabComponent } from './bezahlung-tab/bezahlung-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    ZuZhalenComponent,
    SuggestedAmountComponent,
    BezahlungTabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [BezhalungService, GegebenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
