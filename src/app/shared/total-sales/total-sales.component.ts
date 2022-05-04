import { Component, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss']
})
export class TotalSalesComponent implements OnChanges  {
  @Input() sales:any;
  @Input() currentDate:any;
  @Input() currentFilter:any;

  public totals: number = 0;
  public filter: string = 'septiembre'

  constructor() { }

  useData() {
    var total = 0
    this.sales.map((data:any) => total += data.amount)
    this.totals = total
  }

  ngOnChanges() {
    if (this.sales) {
      this.useData();
    }
    switch(this.currentFilter) {
      case 'day':
        this.filter = 'hoy'
        break;
      case 'week':
        this.filter = 'la semana'
        break;
      case 'month':
        this.filter = 'septiembre'
        break;
      default:
        this.filter = 'septiembre'
    }

  }


}
