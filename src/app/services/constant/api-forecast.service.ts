import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiForecastService {
  private readonly _forecastSales: string;
  constructor(private _apiService: ApiService) {
    this._forecastSales =
      _apiService.flexApiGatewayUrl + "/getSales?month={month}";
  }

  get forecastSales(): string{
    return this._forecastSales;
  }
}
