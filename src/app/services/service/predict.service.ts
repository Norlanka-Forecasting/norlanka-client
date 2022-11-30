import {Injectable} from '@angular/core';
import {HttpService} from "../config/http.service";
import {ApiPredictService} from "../constant/api-predict.service";

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  constructor(
    private httpService: HttpService,
    private apiPredictService: ApiPredictService,
  ) { }

  predictSales(predict :any){
    debugger
    return this.httpService.httpGet(
      this.apiPredictService.predictSales.replace('{otif}',predict.OTFI).replace('{unitPrice}',predict.unitPrice).replace('{pcsPk}',predict.pack).replace('{embelishmentCost}',predict.embelishmentCost)
    );
  }
}
