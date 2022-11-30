import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiPredictService {
  private readonly _predictSales: string;
  constructor(private _apiService: ApiService) {
    this._predictSales =
      _apiService.flexApiGatewayUrl + "/predictSales?otif={otif}&unitPrice={unitPrice}&pcsPk={pcsPk}&embelishmentCost={embelishmentCost}";
  }

  get predictSales(): string{
    return this._predictSales;
  }
}
