import { Component, OnInit, ElementRef } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs';
import {Forecast} from "../../models/forecast";
import {Chart,registerables} from "chart.js";
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public forecastArray: Forecast[] = [];
  public labels: any[] = [];
  public sales: any[] = [];
  public data = {
    labels: this.labels,
    datasets: [{
      label: 'Sales',
      data: this.sales,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  constructor(private elementRef: ElementRef,private http: HttpClient) {

  }

  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    //Read the CSV file
    this.http.get('assets/DataSheet.csv', {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.forecastArray.push(new Forecast( row[0], row[1], row[2] ,row[3],row[4], row[5]));
            this.labels.push(row[0])
            this.sales.push(row[2])
          }

          this.labels = this.labels.sort(function (a, b) {
            var dateA = new Date(a.date_prop).getTime();
            var dateB = new Date(b.date_prop).getTime();
            return dateA < dateB ? -1 : 1; // ? -1 : 1 for ascending/increasing order
          });
        },
        error => {
          console.log(error);
        }
      );

    setTimeout(() => {
        this.data.labels = this.labels.slice(-170)
        this.data.datasets[0].data = this.sales.slice(-170)
        this.RenderChart('','','','line','attendanceChart')
        // this.search = new Search();
      }
      ,300)

  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    new Chart(id, {
      type: 'line',
      data: this.data,
      options: {
        scales: {
          y: {
            stacked: true
          }
        }
      }
    });
  }

}
