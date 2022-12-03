export class Forecast{
  date: any;
  pcs: any;
  quantity: any;
  unitPrice: any;
  otif: any;
  eCost: any;
  totalQuantity: any;
  sales: any;
  constructor(date: any, pcs: any, quantity: any,  unitPrice: any,otif: any,eCost: any,totalQuantity: any ,sales: any) {
    this.date = date;
    this.pcs = pcs;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.otif = otif;
    this.eCost = eCost;
    this.totalQuantity = totalQuantity;
    this.sales = sales;
  }
}
