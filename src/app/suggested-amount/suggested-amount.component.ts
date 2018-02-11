import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggested-amount',
  templateUrl: './suggested-amount.component.html',
  styleUrls: ['./suggested-amount.component.css']
})
export class SuggestedAmountComponent implements OnInit {

   suggestedAmountsList: number[]= [];
  constructor() { }

  ngOnInit() {
    this.suggestedAmountsList = this.suggestedAmount(62.91);
    console.log(this.suggestedAmountsList );
  }

  onSelectAmount(amount: number): void {
    console.log( 'Selected amount= ' + amount);
    // pass the value to gegeben lable on the other component
  }
  /**
   * @param amount
   * this to return list of array suggested amounts
   */

  suggestedAmount(amount: number): number[] {

    let result: number[] = [];
    let i = 0; // indicate the suggestion and get last suggestion
    result [i] = amount;
    if (this.isDecimalNumber(amount) ) {
      i++;
      // result[i] = (Math.round(amount * 10 ) / 10); // this has some error
      // to check if this rounded lower than current amount increase only one else so the rounded number is higher
      result[i] = (Math.round(amount)) > amount ? Math.round(amount) : (Math.round(amount) + 1);
      console.log('second number is = ' + result[i]);
    }
    i++;
    // result[i] = this.nearestGreaterNumberDividFive(result[i - 1]);// wrong number is the current number it self dvidable five
    // to check if the current number not five divdable get the neares greatest number eles add five to the current number
    result[i] = (result[i - 1] % 5 ) !== 0 ? this.nearestGreaterNumberDividFive(result[i - 1]) : (result[i - 1] + 5);

    i++;
    result [i] = result[i - 1] + 5;
    // this to check th bank note
    if ( result[i] < 500) {
      if ( result[i] <  5) {

        i++;
        result[i] = 5;
      }else if (result[i] <  10) {
        i++;
        result[i] = 10;
      }else if (result[i] <  20) {
        i++;
        result[i] = 20;
      }else if (result[i] <  50) {
        i++;
        result[i] = 50;
      }else if (result[i] <  100) {
        i++;
        result[i] = 100;
      }else if (result[i] <  200) {
        i++;
        result[i] = 200;
      }else {
        i++;
        result[i] = 500;
      }


    }

    return result;
  }

/**
 * @param amount
 * This function to check if the amount contain decimal point or not
 */
  isDecimalNumber(amount: number): boolean {
    let result = false;
    result = ((amount % 1) !== 0 ); // if true so there is decimal point
    return result;
    }


/**
 * this function to get the nearest greater number and divdable by five
 * @param numberToCheck
 */
    nearestGreaterNumberDividFive( numberToCheck: number): number {
      let result = Math.round(numberToCheck / 5 ) * 5;
      if ( result < numberToCheck) {
        result = result + 5;

      }

      return result;

    }
}
