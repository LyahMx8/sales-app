import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sale } from '@core/_models/sales.model';
import { SalesService } from '@core/_services/sales.service';

@Component({
  selector: 'app-filter-sales',
  animations: [
    trigger('openClose', [
      state('true', style({
        overflow: 'initial',
        opacity: '1',
        height: '*',
        padding: '15px 20px'
      })),
      state('false', style({
        overflow: 'hidden',
        opacity: '0',
        height: '0px',
        padding: '0px'
       })),
      transition('false <=> true', animate(300))
    ])
  ],
  templateUrl: './filter-sales.component.html',
  styleUrls: ['./filter-sales.component.scss'],
})


export class FilterSalesComponent implements OnInit {
  @Output() salesEvent = new EventEmitter<any>();
  @Output() dateEvent = new EventEmitter<Date>();
  @Output() filteredDate = new EventEmitter<string>();

  public openModal: boolean = false
  public activeFilter: string = 'month'
  public currentDate = new Date('2020-09-10T07:12:43')
  public transactions: any

  filtersForm = new FormGroup({
    saleFilter: new FormControl('', Validators.required)
  });


  constructor(
    public salesService: SalesService
  ) { }

  ngOnInit() {
    this.getSales('', '')
    this.dateEvent.emit(this.currentDate)
  }

  getSales(filter: string, criteria: any) {
    this.salesService.salesData()
      .subscribe(data => {
        this.transactions = data
        this.transactions.map((transactions:any) => {
          switch(filter) {
            case 'selector':
              switch(criteria) {
                case 'day':
                  return transactions.filter((sale:any) => new Date(sale.date).getDay() == this.currentDate.getDay())
                  break;
                case 'week':
                  return transactions.filter((sale:any) => this.getWeek(new Date(sale.date)) == this.getWeek(this.currentDate))
                  break;
                case 'month':
                  return transactions.filter((sale:any) => new Date(sale.date).getMonth() == this.currentDate.getMonth())
                  break;
              }
              break;
            case 'filter':
              if(criteria.saleFilter == 'all') {
                return transactions
              } else {
                return transactions.filter((sale:any) => sale.paymentMethod == criteria.saleFilter)
              }
              break;
            default:
              return transactions
          }
        })
        this.salesEvent.emit(this.transactions)
      })
  }

  getWeek(date:any) {
    var startDate = new Date(date.getFullYear(), 0, 1).getTime();
    var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + days) / 7);
  }

  filterByDate(date:string) {
    this.activeFilter = date
    this.getSales('selector', date)
    this.filteredDate.emit(date)
  }

  filterByType() {
    this.openModal = false
    this.filtersForm.value
    this.getSales('filter', this.filtersForm.value)
  }

}
