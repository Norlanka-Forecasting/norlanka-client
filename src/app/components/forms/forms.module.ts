import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { MessageComponent } from './message/message.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MessageComponent,
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule
  ],
  exports: [
    MessageComponent,
  ],
})
export class FormModule { }
