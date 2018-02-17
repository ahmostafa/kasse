import { Component, OnInit, OnDestroy } from '@angular/core';
import { BezhalungService } from '../services/bezhalung.service';
import { GegebenService } from '../services/gegeben.service';
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
    selectedAmount= 0;
    numPadNumberStr= '';
    paidAmountGiven = false;
    suggestedListReady = false;
  constructor(private bezahlungService: BezhalungService, private gegebenService: GegebenService) {
    this.subScription = this.bezahlungService.getAmountOfAllItems().subscribe(
      totalAmount => {this.suggestedAmountsList = this.suggestedAmount(totalAmount.amountOfAllItems); });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
   this.subScription.unsubscribe();
  }
/**
 * @description to check is number pad btns enabled or not
*/
  isNumPadEnable(): boolean {
    let result = false;
    result = (!this.suggestedListReady || this.paidAmountGiven);
    return result;
  }
/**
 * @description this when click on any btn from number pad
 * @param btnTxt
 */
  onNumPadBtnClick(btnTxt: string): void {
    if ( btnTxt === 'b' && this.numPadNumberStr.length > 0) {
      this.numPadNumberStr = this.numPadNumberStr.slice(0, -1);
      console.log('case 1');
    }else if ( this.numPadNumberStr.indexOf('.') === -1 && btnTxt !== 'b' ) {
      console.log('case 2');
      this.numPadNumberStr += btnTxt;
    }else if ((this.numPadNumberStr.length - this.numPadNumberStr.indexOf('.')) < 3 && (btnTxt !== '.' && btnTxt !== 'b')) {
      console.log('case 3');
      this.numPadNumberStr += btnTxt;
    }

    console.log(this.numPadNumberStr);
  }

  /**
   * @description when the ok of number pad clicked to check is the entered amount equal the requested and to set the given amount 
   * 
   */
  onZahlenBtnClick(): void {
    const  padNumber = parseFloat(this.numPadNumberStr);
    const rest =  padNumber - this.suggestedAmountsList[this.suggestedAmountsList.length - 1];
    if ( rest < 0) {
      alert('Error The entered number is = ' +  padNumber
      + 'and this is lower than the total amount number = ' + this.suggestedAmountsList[this.suggestedAmountsList.length - 1] );
    }else if ( rest > 0 ) {
      this.onSelectAmount( padNumber);
    }else {
      this.onSelectAmount( padNumber);
    }
  }

  /**
   * @description this when select amout to set it as given or paid amount
   * @param amount
   */
  onSelectAmount(amount: number): void {
    this.paidAmountGiven = true;
    this.suggestedListReady = false;
    console.log( 'Selected amount= ' + amount);
    this.selectedAmount = amount;
    this.gegebenService.setPaidAmount(amount);
    this.numPadNumberStr = '';
  }


  /**
   * @param amount
   * this to return list of array suggested amounts
   */

  suggestedAmount(amount: number): number[] {
    if ( amount === 0) {
      this.paidAmountGiven = false;
      this.suggestedListReady = false;
      return [];
    }
    this.paidAmountGiven = false;
    this.suggestedListReady = true;
    this.selectedAmount =  0;
    this.numPadNumberStr = '';
    const result: number[] = [];
    let i = 0; // indicate the suggestion and get last suggestion
    result [i] = amount; // FIRST
    if (( (result[i] % 500) !== 0)) {
      console.log('First ' + result[i]);
        if (this.isDecimalNumber(amount) ) {
          i++; // SECOND
          // to check if this rounded lower than current amount increase only one else so the rounded number is higher
          result[i] = (Math.round(amount)) > amount ? Math.round(amount) : (Math.round(amount) + 1);
          console.log('second number is = ' + result[i]);
        }
        i++; // THird
        // to check if the current number not five divdable get the neares greatest number eles add five to the current number
        if ( (result[i - 1] % 5 ) !== 0 ) {// the number is not dividable on five
          result[i] = this.nearestGreaterNumberDividFive(result[i - 1]);
        }else if (( result[i - 1] % 10 === 5)) {// start with five
          result [i] = result[i - 1] + 5 ;
        }else if (this.isBankNote(result[i - 1])) {
          result [i] = this.getNextBankNote(result[i - 1]);
        }else {
          result [i] = this.getNextNumberForNumbersStartWithZeor(result[i - 1]);
        }
        console.log('Third ' + result[i]);

        // FOURTH &  FIFTH
        for (let index = 0; index < 2; index++) {
            if ( (result[i] % 500) !== 0) {
                i++;
                if (( result[i - 1] % 10 === 5)) {// start with five
                  result [i] = result[i - 1] + 5 ;
                }else if (this.isBankNote(result[i - 1])) {
                  result [i] = this.getNextBankNote(result[i - 1]);
                }else {
                  result [i] = this.getNextNumberForNumbersStartWithZeor(result[i - 1]);
                }
            }

        }

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
          if (temp / 2 === 100) {
              result = this.getNextBankNote(temp);
          }else if (this.isBankNote(temp)) {
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
     * this function to get the next bank note the enum start from 10
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
/**
 * @description this to get next banknote based of enum which start from 10
 * @param amount 
 */
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
