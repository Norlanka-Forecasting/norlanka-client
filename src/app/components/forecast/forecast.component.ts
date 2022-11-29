import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public date: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(userForm: any) {

  }
}
