import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForecastComponent} from "../forecast/forecast.component";

const routes: Routes = [
  { path: 'forecast', component: ForecastComponent, data: {title: 'Forecast'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
