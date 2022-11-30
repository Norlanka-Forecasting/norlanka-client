import { Component, OnInit } from '@angular/core';
import {ForecastService} from "../../services/service/forecast.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe, formatDate} from "@angular/common";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public date: any;
  public forecastValue: any = 0;

  constructor(private forecastService: ForecastService,private toaster: ToastrService) { }

  ngOnInit(): void {

  }

  onSubmit(userForm: any) {
    this.date = formatDate(this.date, 'yyyy-MM', 'en');
    //This is required to create the message
    this.forecastService.forecastSales(this.date).subscribe(
      (res: any) => {
        this.forecastValue = res;
        this.toaster.success('Forecast has been done successfully.', 'Forecasting Successful!',{
          closeButton: true,
        });
      },(error: any) => {
        this.toaster.error('Please try again latter.', 'Something went wrong!',{
          closeButton: true,
        });
      }
    )
  }
}
