import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from '../product-detail/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //Inject the HttpClient object to the constructor
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    //make a GET call to "http://localhost:3000/products" 
    //replace of() with relevant data returned by the API
    return  this.http.get<any>('http://localhost:4000/products').pipe(map(data=>data, catchError(err=>of(err.message))));
  }
}

