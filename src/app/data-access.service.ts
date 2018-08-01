import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

 /** @constructor
   */

  constructor(private http: HttpClient) { }
  fetchData (event) {
    this.http.get(`https://exchangeratesapi.io/api/latest?base=${event}`).subscribe(response => {
      console.log(response);
      return response;
    });
  }

}
