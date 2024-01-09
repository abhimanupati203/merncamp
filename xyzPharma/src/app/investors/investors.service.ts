import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Quarterinfo} from './Quarterinfo';

@Injectable({
  providedIn: 'root'
})
export class InvestorsService {

  //Inject the HttpClient object to the constructor
  constructor() { }

  getQDetails():Observable<Quarterinfo[]> {
    //make a GET call to  "http://localhost:3000/quaterInfo"
    //replace of() with relevant data returned by API
    return of();

  }
}
