import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { SuggestedAmountComponent } from '../suggested-amount/suggested-amount.component';
import { BezhalungService } from '../services/bezhalung.service';
import { GegebenService } from '../services/gegeben.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-zu-zhalen',
  templateUrl: './zu-zhalen.component.html',
  styleUrls: ['./zu-zhalen.component.css']
})
export class ZuZhalenComponent implements OnInit {
//  @Input()
  // suggestedComp: SuggestedAmountComponent;
  subScription: Subscription;
   amount = 0;
   givenAmount = 0;
  constructor(private bezahlungService: BezhalungService, private gegebenService: GegebenService) {
    this.subScription = this.gegebenService.getPaidAmount().subscribe(
      paidAmount => {
          this.givenAmount = paidAmount.paidAmount;
          const paidNumber = this.givenAmount ;
          const rest = paidNumber - this.amount;
          if ( rest < 0) {
            alert('Fehler Gegeben ist = ' + paidNumber
            + 'und das ist niedriger als Zahlung = ' + this.amount);
          }else if ( rest > 0 ) {
            alert('zurück = ' + rest.toFixed(2));
          }else {
            alert('Vielen Dank!');
          }
      } );
  }

  ngOnInit() {
  }
/**
 * @description after the total amount enterd which should the customer pay
*/
 amountScaned(): void {
   console.log('amountScaned called');
   this.bezahlungService.sendAmountOfAllItems(this.amount);
  //  this.suggestedComp.suggestedAmount(this.amount);
/// here amount should be sent to show suggested list
  }
/**
 * @description to clear all data to prepare for taken next customer
 */
  nextCustomer(): void {
    this.givenAmount = 0;
    this.amount = 0;
    this.bezahlungService.sendAmountOfAllItems(this.amount);
  }

}


