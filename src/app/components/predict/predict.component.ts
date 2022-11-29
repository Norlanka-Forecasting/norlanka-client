import { Component, OnInit } from '@angular/core';
import {Predict} from "../../models/predict";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {
  packsList: any[] = [2,3,7];
  predict : Predict = new Predict();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(userForm: any) {

  }
}
