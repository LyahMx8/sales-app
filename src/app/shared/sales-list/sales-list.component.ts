import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnChanges {
  @Input() sales:any = [];
  @Input() currentFilter:any;

  public filter: string = 'septiembre'

  constructor() { }

  ngOnChanges() {
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

  trackByItems(index:number, item:any): number {return item.id}

}
