import { Component, OnInit, ElementRef } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs';
import {Forecast} from "../../models/forecast";
import {Chart,registerables} from "chart.js";
import {formatDate} from "@angular/common";
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public forecastArray: Forecast[] = [];
  public labels: any[] = [];
  public otifLabels: any[] = [];
  public sales: any[] = [];
  public otifs: any[] = [];
  public quantity: any[] = [];
  public bodySuite: any = 100;
  public unitPrice: any[] = [];
  public data = {
    labels: this.labels,
    datasets: [{
      label: 'Quantity',
      data: this.quantity,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.2
    },{
      label: 'Revenue',
      data: this.sales,
      fill: false,
      borderColor: 'rgb(192,75,145)',
      tension: 0.2
    }]
  };
  public lastFinancialYear: any;
  public lastFinancialYearSales: number = 0;
  public lastFinancialYearQuantity: number = 0;
  public max: number = 0;
  public min: number = 0;

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
            this.forecastArray.push(new Forecast( row[0], row[1], row[2] ,row[3],row[4], row[5],row[6],row[7]));
            this.unitPrice.push(row[3])
          }
          this.max = this.unitPrice.reduce((a, b)=>Math.max(a, b));
          this.min = this.unitPrice.reduce((a, b)=>Math.min(a, b));

          //Group by date
          const groupQuantityByDate = this.groupQuantityByDateColumn();
          const groupSalesByDate = this.groupSalesByDateColumn();
          const groupOtifByDate = this.groupOtifByDateColumn();
          //create new labels and sales
          this.createLabelsSalesOtif(groupQuantityByDate,0);
          this.createLabelsSalesOtif(groupSalesByDate,1);
          this.createLabelsSalesOtif(groupOtifByDate,2);
          // this.otifLabels = this.labels.slice(8)
          // this.otifs = this.otifs.slice(8)
          //Change date format
          this.changeDateFormat();



        },
        error => {
          console.log(error);
        }
      );

    setTimeout(() => {
        this.RenderChart('','','','line','salesAndQuantityChart')
        this.RenderSuiteQuantityChart('','','','doughnut','quantityDoughnut')
        this.RenderOTIFBarChart('','','','bar','otifBarChart')
      }
      ,1000)

  }

  groupQuantityByDateColumn(){
    const totalQuantity = this.forecastArray.reduce((group, sales) => {
      // @ts-ignore
      const date = sales.date;
      // @ts-ignore
      group[date] = group[date] ?? [];
      // @ts-ignore
      group[date].push(sales.totalQuantity);
      return group;
    }, {});

    return totalQuantity;
  }

  groupSalesByDateColumn(){
    const totalSales = this.forecastArray.reduce((group, sales) => {
      // @ts-ignore
      const date = sales.date;
      // @ts-ignore
      group[date] = group[date] ?? [];
      // @ts-ignore
      group[date].push(sales.sales);
      return group;
    }, {});
    return totalSales;
  }

  groupOtifByDateColumn(){
    const totalOtif = this.forecastArray.reduce((group, sales) => {
      // @ts-ignore
      const date = sales.date;
      // @ts-ignore
      group[date] = group[date] ?? [];
      // @ts-ignore
      group[date].push(sales.otif);
      return group;
    }, {});

    return totalOtif;
  }


  changeDateFormat(){
    //Make the labels according to order
    this.labels = this.labels.sort(function (a, b) {
      var dateA = new Date(a).getTime();
      var dateB = new Date(b).getTime();
      return dateA < dateB ? -1 : 1; // ? -1 : 1 for ascending/increasing order
    });
  }

  createLabelsSalesOtif(groupByDate: any,index: any){
    //create the object into an array
    const array = Object.keys(groupByDate);
    const arrayLength = array.length;

    this.lastFinancialYear = Object.keys(groupByDate)[arrayLength - 1];
    //create new labels and sales
    for (let i = 0; i<arrayLength; i++){
      let key = Object.keys(groupByDate)[i];
      let value = Object.values(groupByDate)[i];
      switch(index) {
        case 0: {
          this.labels.push(formatDate(key, 'yyyy-MMM', 'en'));
          // @ts-ignore
          let sum = value.reduce((acc, cur) => acc + Number(cur), 0)
          this.quantity.push(sum);
          if(key == this.lastFinancialYear){
            this.lastFinancialYearQuantity = this.lastFinancialYearQuantity + sum;
          }
          break;
        }
        case 1: {
          // @ts-ignore
          let totSales = value.reduce((acc, cur) => acc + Number(cur), 0)
          this.sales.push(totSales);
          if(key == this.lastFinancialYear){
            this.lastFinancialYearSales = this.lastFinancialYearSales + totSales;
          }
          break;
        }
        case 2: {
          this.otifLabels.push(formatDate(key, 'yyyy-MMM', 'en'));
          // this.otifLabels = this.otifLabels.slice(-8);
          // @ts-ignore
          let totOtif = value.reduce((acc, cur) => acc + Number(cur), 0)
          this.otifs.push(totOtif);
          break;
        }
        default: {
          break;
        }
      }
    }
    this.otifLabels = this.otifLabels.slice(-9);
    this.otifs = this.otifs.slice(-9);
  }

  getSalesCount(data:any) {
    return data.filter((entry : any) => entry === this.lastFinancialYear);
  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    new Chart(id, {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          y: {
            stacked: true
          }
        }
      }
    });
  }

  RenderSuiteQuantityChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: 'doughnut',
      data: {
        labels: [
          'Body Suites',
          'Sleep Suites',
          'Bibs',
        ],
        datasets: [{
          label: 'Employee Details',
          data: [this.bodySuite, 0,0,0],
          backgroundColor: [
            'rgb(12,213,85)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4
        }]
      }
    });
  }

  RenderOTIFBarChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: 'bar',
      data: {
        labels: this.otifLabels,
        datasets: [
          {
            label: 'OTIF',
            data: this.otifs,
            backgroundColor: 'rgb(199,133,173)',
            borderColor: 'rgb(192,75,145)',
            borderWidth: 3,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            barThickness: 30
          },
        ]
      }
    });
  }

}
