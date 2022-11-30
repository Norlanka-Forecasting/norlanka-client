import {Injectable} from '@angular/core';
import {HttpService} from "../config/http.service";
import {ApiForecastService} from "../constant/api-forecast.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  public httpOptions = {
    headers: new HttpHeaders()
  };
  constructor(
    private httpService: HttpService,
    private apiForecastService: ApiForecastService,
  ) { }

  forecastSales(year :any){
    debugger
    return this.httpService.httpGet(
      this.apiForecastService.forecastSales.replace('{month}',year)
    );
  }
}
