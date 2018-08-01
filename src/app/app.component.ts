/**
 * @fileOverview Exchange Rates Calculator
 * @author <a href="mailto:vibhavari.coppole@gmail.com">Vibhavari Coppole Balaji</a>
 * @version 1.0
 */
import { Component, Input, OnInit  } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { IExchange, Exchange } from './iexchange';
import { IRates } from './iexchange';
import { Rates } from './iexchange';
import { DataAccessService } from './data-access.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

 /**
  * @constructor
 */
  constructor(private http: HttpClient, private dataAccessService: DataAccessService) {}

   /**
 * Represents the params.
 *@param {string} title - The title of the app.
 *@param {array} options - The options available for currencies.
 *@param {any} optionSelected - The optionselected in the dropdown.
 *@param {any} posts - The response obtained from the API.
 *@param {array} keyArr - The rate keys.
 *@param {boolean} visible - Toggles the display of div
 *@param {string} excName - The exchange name
 *@param {number} rateValue - The rate values
 *@param {IExchange} exchange - Object of IExchange to store new exchange rates
 *@param {rate} IRates - The rate values object of type IRates
 *@param {newRatesArray} IRates - The rate values array.
 */

 title = 'ExchangeRateApp';
 options = ['USD', 'EUR', 'GBP', 'AUD'];
 optionSelected: any;
 chosen: any;
 posts: any;
 keyArr: any[];
 dataArr: any[];
 visible = false;
 excName = '';
 rateValue = null;
 curName = '';
 exchange: IExchange;
 rate: IRates;
 newRates: IRates[];

 ngOnInit (): void {
  this.newRates = [];
}
     /** Main method which fetches data from the service and populates the
   * keyArr and dataArr with rate values.
   */
onOptionsSelected(event) {
  this.visible = true;
  this.chosen = event.toString();
if (this.chosen !== 'USD' && this.chosen !== 'AUD' && this.chosen !== 'EUR' && this.chosen !== 'GBP') {
  this.posts = JSON.parse(sessionStorage.getItem(this.chosen));
  this.dataArr = [];
  this.keyArr = [];
  for (let i = 0; i < this.posts.rates.length; i++) {
    this.keyArr.push(this.posts.rates[i].exchName);
  }
  for (let i = 0; i < this.posts.rates.length; i++) {
    this.dataArr.push(this.posts.rates[i].exchRate);
  }
 } else {
  this.posts = JSON.parse(sessionStorage.getItem(this.chosen));
  if (this.posts !== null) {
    console.log('In local storage');
    this.dataArr = [];
    this.keyArr = Object.keys(this.posts.rates);
    this.keyArr.forEach((key: any) => {
      if (key !== this.chosen) {
      this.dataArr.push(this.posts.rates[key]);
      }
    });
  } else {this.http.get(`https://exchangeratesapi.io/api/latest?base=${event}`).subscribe(response => {
    this.posts = response;
    console.log('In api storage');
    this.dataArr = [];
    this.keyArr = Object.keys(this.posts.rates);
    this.keyArr.forEach((key: any) => {
      if (key !== this.chosen) {
      this.dataArr.push(this.posts.rates[key]);
      }
      sessionStorage.setItem(this.posts.base, JSON.stringify(this.posts));
    });
  });
  }
 }
}

   /** Adds new exchange rates into Rate
   */

  addMore() {
    this.newRates = [];
    if (this.validate()) {
    this.rate = new Rates(this.excName, this.rateValue);
    this.newRates.push(this.rate);
    this.excName = '';
    this.rateValue = null;
    alert('New Exchange Rate added succesfully!');
    }
  }
   /** Creates base rate and exchange rates and updates options
   */

  submit() {
    if (this.validate()) {
    this.options.push(this.curName);
    const today = new Date();
    this.rate = new Rates(this.excName, this.rateValue);
    this.newRates.push(this.rate);
    this.exchange = new Exchange(this.curName, today, this.newRates);
    console.log(this.exchange, this.rate);
    sessionStorage.setItem(this.curName, JSON.stringify(this.exchange));
    this.newRates = [];
    this.excName = '';
    this.rateValue = null;
    this.curName = '';
    alert('New currency added succesfully!');
    }
  }

   /** Handles the validations for rate value and exchange currency names
   */
  validate(): boolean {
    if (this.curName.length === 0) {
      alert('Enter the base currency name');
      return false;
    }

    if (this.excName.length === 0) {
      alert('Enter the exchange currency name');
      return false;
      }
        if (this.rateValue === null) {
        alert('Enter the base currency name');
        return false;
        }
      if (isNaN(this.rateValue)) {
        alert('Rate must be a number');
        this.rateValue = null;
        return false;
      }
      return true;
  }

}
