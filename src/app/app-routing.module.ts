import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import {AuthGuard} from "./services/auth/shared/auth.guard";
import {ForecastComponent} from "./components/forecast/forecast.component";
import {PredictComponent} from "./components/predict/predict.component";


const routes: Routes = [
  { path: '', component: PagesLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forecast',  component: ForecastComponent},
  { path: 'predict',  component: PredictComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
