import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { SuggestedAmountComponent } from '../suggested-amount/suggested-amount.component';

@Component({
  selector: 'app-zu-zhalen',
  templateUrl: './zu-zhalen.component.html',
  styleUrls: ['./zu-zhalen.component.css']
})
export class ZuZhalenComponent implements OnInit {
//  @Input()
  // suggestedComp: SuggestedAmountComponent;
   amount = 5;
   givenAmount = 5;
  constructor() { }

  ngOnInit() {
  }

 amountScaned(): void {
  //  this.suggestedComp.suggestedAmount(this.amount);
/// here amount should be sent to show suggested list
  }

}


