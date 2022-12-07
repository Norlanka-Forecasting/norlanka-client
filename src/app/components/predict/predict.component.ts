import {Component, ElementRef, OnInit} from '@angular/core';
import {Predict} from "../../models/predict";
import {formatDate} from "@angular/common";
import {PredictService} from "../../services/service/predict.service";
import {ToastrService} from "ngx-toastr";
import {ValidateInput} from "../../helper/helper";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {
  packsList: any[] = [2,3,5,7];
  predict : Predict = new Predict();
  predictSales: any = 0;
  otif: any = '';

  constructor(
    private predictService : PredictService,
    private toaster : ToastrService,
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(userForm: any) {
    //This is required to create the message
    if (ValidateInput(userForm, this.el, this.toaster)) {
      // this.predict.OTFI = this.otif/100;
      this.predictService.predictSales(this.predict).subscribe(
        (res: any) => {
          this.predictSales = res;
          this.toaster.success('Prediction has been done successfully.', 'Prediction Successful!', {
            closeButton: true,
          });
        }, (error: any) => {
          this.toaster.error('Please try again latter.', 'Something went wrong!', {
            closeButton: true,
          });
        }
      )
    }
  }
}
