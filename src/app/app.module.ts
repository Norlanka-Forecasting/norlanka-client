import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {PagesLoginComponent} from "./pages/pages-login/pages-login.component";
import {FormModule} from "./components/forms/forms.module";
import {ToastNoAnimationModule, ToastrModule} from "ngx-toastr";
import {NgxPermissionsModule} from "ngx-permissions";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Store} from "./services/auth/store";
import { ForecastComponent } from './components/forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    PagesLoginComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    FormsModule,
  ],
  providers: [
    Store,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
