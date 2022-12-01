import {Component, ElementRef, OnInit} from '@angular/core';
import {ForecastService} from "../../services/service/forecast.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe, formatDate} from "@angular/common";
import {ValidateInput} from "../../helper/helper";
import {UserService} from "../../services/service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public date: any;
  public forecastValue: any = 0;

  constructor(
    private forecastService: ForecastService,
    private toaster: ToastrService,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {

  }

  onSubmit(userForm: any) {
    //This is required to create the message
    if (ValidateInput(userForm, this.el, this.toaster)) {
      this.date = formatDate(this.date, 'yyyy-MM', 'en');
      this.forecastService.forecastSales(this.date).subscribe(
        (res: any) => {
          this.forecastValue = res;
          this.toaster.success('Forecast has been done successfully.', 'Forecasting Successful!', {
            closeButton: true,
          });
        }, (error: any) => {
          this.toaster.error('Please try again latter.', 'Something went wrong!', {
            closeButton: true,
          });
        }
      )
    }
  }
}
