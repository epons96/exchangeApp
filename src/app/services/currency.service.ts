import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrencyList, Conversion } from '../currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private baseUrl: string = 'https://api.getgeoapi.com/v2';

  get params(){
    return{ 
      api_key:'c14d1c1421bab8debbe53f068ec66aac61f40276',
      from:'',
      to:'',
      amount: 0,
      format:'json'
  };
  }

  constructor( private http: HttpClient ) { }

  getCurrencyList():Observable<CurrencyList>{
    return this.http.get<CurrencyList>(`${ this.baseUrl }/currency/list`,{ params:this.params })
  }

  getCurrencyConversion( currency:string, currency2:string, amount:string ){
    
    const params = {...this.params, from:currency, to:currency2, amount:amount }

    return this.http.get<Conversion>(`${ this.baseUrl }/currency/convert`, {params})
  }
}
