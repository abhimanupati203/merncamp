import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quarterinfo } from './Quarterinfo';
import { InvestorsService } from './investors.service';
import {CheckcasingPipe} from './checkcasing.pipe';
@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {
  quaterFor!: FormGroup;
  quaterDetails!:any;
  showTable: boolean = false;
  selectedQDetails!: string;
  errorMessage!: string;
  showError: boolean = false;

 //Inject the FormBuilder and investorsService, InvestorsService and CheckcasingPipe objects to the constructor
 constructor() { }

 ngOnInit() {
   //Initialize the variable quaterForm with a FormBuilder group method containing the below mentioned form control.
   //quater: required validation
   //fyear: required validation
 }//ngOninit

 //Implement getQDetails method that takes in value from input field and display the details of the quater asked for
 getQDetails() {

   //initialize selectedQDetails to the call of the customPipe transform method to convert quater in uppercase and then combine the quater and year entered

             //code here

   //implement the call to getQDetails() of investorsService that will filter the detail of the selected quater and financial year, if specified quater is not available show corresponding errorMessage

             //code here
 }
}
