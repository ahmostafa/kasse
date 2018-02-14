import { Component, OnInit, OnDestroy } from '@angular/core';
import { BezhalungService } from '../services/bezhalung.service';
import { Subscription } from 'rxjs/Subscription';
enum BankNote { TEN = 10,  TWENTY= 20, FIFTY = 50, HUNDRED = 100, TWOHUNDRED = 200, FIFEHUNDRED = 500 }
@Component({
  selector: 'app-suggested-amount',
  templateUrl: './suggested-amount.component.html',
  styleUrls: ['./suggested-amount.component.css']
})
export class SuggestedAmountComponent implements OnInit, OnDestroy {

   suggestedAmountsList: number[]= [];
   subScription: Subscription;
  constructor(private bezahlungService: BezhalungService) {
    this.subScription = this.bezahlungService.getAmountOfAllItems().subscribe(
      totalAmount => {this.suggestedAmountsList = this.suggestedAmount(totalAmount.amountOfAllItems); });
  }

  ngOnInit() {
    // this.suggestedAmountsList = this.suggestedAmount(62.91);
    // console.log(this.suggestedAmountsList );
  }

  ngOnDestroy() {
   this.subScription.unsubscribe();
  }

  onSelectAmount(amount: number): void {
    console.log( 'Selected amount= ' + amount);
    this.bezahlungService.setPaidAmount(amount);
    // pass the value to gegeben lable on the other component
  }
  /**
   * @param amount
   * this to return list of array suggested amounts
   */

  suggestedAmount(amount: number): number[] {

    const result: number[] = [];
    let i = 0; // indicate the suggestion and get last suggestion
    result [i] = amount; // FIRST
    if (this.isDecimalNumber(amount) ) {
      i++; // SECOND
      // result[i] = (Math.round(amount * 10 ) / 10); // this has some error
      // to check if this rounded lower than current amount increase only one else so the rounded number is higher
      result[i] = (Math.round(amount)) > amount ? Math.round(amount) : (Math.round(amount) + 1);
      console.log('second number is = ' + result[i]);
    }
    i++; // THird
    // result[i] = this.nearestGreaterNumberDividFive(result[i - 1]);// wrong number is the current number it self dvidable five
    // to check if the current number not five divdable get the neares greatest number eles add five to the current number
    // tslint:disable-next-line:max-line-length
    // result[i] = (result[i - 1] % 5 ) !== 0 ? this.nearestGreaterNumberDividFive(result[i - 1]) : ( result[i - 1].valueOf() + 5); // this is has issues
    if ( (result[i - 1] % 5 ) !== 0 ) {// the number is not dividable on five
      result[i] = this.nearestGreaterNumberDividFive(result[i - 1]);
    }else if (( result[i - 1] % 10 === 5)) {// start with five
      result [i] = result[i - 1] + 5 ;
    }else if (this.isBankNote(result[i - 1])) {
      result [i] = this.getNextBankNote(result[i - 1]);
    }else {
      result [i] = this.getNextNumberForNumbersStartWithZeor(result[i - 1]);
    }

    i++;
    //FOURTH
     // result [i] = ( result[i - 1] % 10 === 5) ? result[i - 1] + 5 : this.getNextNumberForNumbersStartWithZeor(result[i - 1])  ;// updated
    if (( result[i - 1] % 10 === 5)) {// start with five
      result [i] = result[i - 1] + 5 ;
    }else if (this.isBankNote(result[i - 1])) {
      result [i] = this.getNextBankNote(result[i - 1]);
    }else {
      result [i] = this.getNextNumberForNumbersStartWithZeor(result[i - 1]);
    }
     console.log('fourth = ' + result[i]);
    // if ( result[i - 1] % 10 === 5) {
    //   console.log('true');
    //   console.log(result[i - 1] % 10);
    //   console.log(result [i - 1]);
    //     result[i] = result[i - 1] + 5;
    // }else {
    //   result[i] = result[i - 1] + 10;
    // }
    // console.log(result [i]);
    // this to check th bank note
    // FIFTH
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
      console.log('Fifth = ' + result[i]);

    }

    return result.reverse();
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
      console.log('nearestGreaterNumberDividFive ' + result);
      if ( result < numberToCheck) {
        result = result + 5;

      }

      return result;

    }
/**
 * @description this function to get next suggested number start with zero but is not bank note
 * @param amount
 */
    getNextNumberForNumbersStartWithZeor(amount: number): number {
      let result = 0;
      if (20 < amount && amount < 50) {
          const temp = amount - 20;
          console.log('temp' + temp);
          console.log('this.getNextBankNote(temp) ' + this.getNextBankNote(temp));
          result = (temp / 2 === 10) ? this.getNextBankNote(temp) : 20 + this.getNextBankNote(temp);
      }else if (50 < amount && amount < 100) {
          const temp = amount - 50;
          if (this.isBankNote(temp)) {
              result = 50 + this.getNextBankNote(temp);
          }else if (temp / 2 === 20) {
              result = 50 + this.getNextBankNote(20);
          }else {
              result = 50 + this.getNextNumberForNumbersStartWithZeor(temp);
          }
      }else if (100 < amount && amount < 200) {
          const temp = amount - 100;
          if (this.isBankNote(temp)) {
              result = 100 + this.getNextBankNote(temp);
          }else if (temp / 2 === 20) {
              result = 100 + this.getNextBankNote(20);
          }else {
              result = 100 + this.getNextNumberForNumbersStartWithZeor(temp);
          }
      }else if (200 < amount && amount < 500) {
          const temp = amount - 200;
          if (this.isBankNote(temp)) {
              result = 200 + this.getNextBankNote(temp);
          }else if (temp / 2 === 20) {
              result = 200 + this.getNextBankNote(20);
          }else {
              result = 200 + this.getNextNumberForNumbersStartWithZeor(temp);
          }
      }else if (amount > 500) {
        const temp = amount % 500;
        if (this.isBankNote(temp)) {
          result = (amount - temp ) + this.getNextBankNote(temp);
        }else if (temp / 2 === 20) {
          result = (amount - temp ) + this.getNextBankNote(20);
        }else {
          result = (amount - temp ) + this.getNextNumberForNumbersStartWithZeor(temp);
        }
      }
      return result;
  }
    /**
     * this function to get the next bank note
     * @param amount
     */
    isBankNote(amount: number): boolean {
      switch (amount) {
         case BankNote.TEN:
         case BankNote.TWENTY:
         case BankNote.FIFTY:
         case BankNote.HUNDRED:
         case BankNote.TWOHUNDRED:
         case BankNote.FIFEHUNDRED:
              return true;
         default:
              return false;

     }
 }

 getNextBankNote(amount: number): number {
  let result = 0;
  if (this.isBankNote(amount)) {
      switch (amount) {
          case (BankNote.TEN):
              result = BankNote.TWENTY;
              break;
          case (BankNote.TWENTY):
              result = BankNote.FIFTY;
              break;
          case (BankNote.FIFTY):
              result = BankNote.HUNDRED;
              break;
          case (BankNote.HUNDRED):
              result = BankNote.TWOHUNDRED;
              break;
          case (BankNote.TWOHUNDRED):
              result = BankNote.FIFEHUNDRED;
              break;
          case (BankNote.FIFEHUNDRED):
              result = BankNote.FIFEHUNDRED; // should handle it
              break;
      }
  }
  return result;
}


}
