import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _flexApiGatewayUrl: any;
  constructor() {
    this._flexApiGatewayUrl = environment.baseUrl;
  }

  get flexApiGatewayUrl(): any {
    return this._flexApiGatewayUrl;
  }
}
