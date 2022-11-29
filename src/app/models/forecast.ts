export class Forecast{
  date: any;
  pcs: any;
  sales: any;
  unitPrice: any;
  otif: any;
  eCost: any;
  constructor(date: any, pcs: any, sales: any, unitPrice: any,otif: any,eCost: any) {
    this.date = date;
    this.pcs = pcs;
    this.sales = sales;
    this.unitPrice = unitPrice;
    this.otif = otif;
    this.eCost = eCost;
  }
}
