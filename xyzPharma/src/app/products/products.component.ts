import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service'
import { Product } from '../product-detail/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProduct!: Product[];
  displaysearch: boolean = false;
  searchedProduct!: Product;
  errorMessage!: string;
  showError: boolean = false;
  searchmed!:any;
  //Inject the Router and ProductsService object to the constructor
  constructor() {

  }

  // implement getSpecificProducts() that will filter the details of the specific product registed for from the product list
  getSpecificProducts(val:any) {    

    //implement call to getAllProducts() in productsService
    
  }
  ngOnInit() {
    //code to display all product on load of product page
  }

  viewDetails(val:any) {
    // do programatically navigation to product-detail component, passing the product selected received as parameter of viewDetails()
  }
  
}


