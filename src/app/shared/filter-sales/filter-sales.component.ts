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
  @Output() salesEvent = new EventEmitter<string>();
  @Output() dateEvent = new EventEmitter<Date>();
  @Output() filteredDate = new EventEmitter<string>();

  public openModal: boolean = false
  public activeFilter: string = 'month'
  public currentDate = new Date('2020-09-10T07:12:43')
  public salesList: any
  public timeFilter: any
  public typeFilter: any

  filtersForm = new FormGroup({
    saleFilter: new FormControl('', Validators.required)
  });


  constructor(
    public salesService: SalesService
  ) { }

  ngOnInit() {
    this.getSales()
    this.dateEvent.emit(this.currentDate)
  }

  getSales() {
    this.salesService.salesData()
      .subscribe((data:any) => {
        this.salesList = data
        this.salesEvent.emit(this.salesList)
      })

  }

  filterSales(filter:any, criteria:any) {
    if(filter == 'date') {
      this.timeFilter = this.salesList
      switch(criteria) {
        case 'day':
          this.timeFilter = this.timeFilter.filter((sale:any) => new Date(sale.date).getDay() == this.currentDate.getDay())
          break;
        case 'week':
          this.timeFilter = this.timeFilter.filter((sale:any) => this.getWeek(new Date(sale.date)) == this.getWeek(this.currentDate))
          break;
        case 'month':
          this.timeFilter = this.timeFilter.filter((sale:any) => new Date(sale.date).getMonth() == this.currentDate.getMonth())
          break;
      }
      this.salesEvent.emit(this.timeFilter)
    } else if(filter == 'type') {
      !this.timeFilter ? this.typeFilter = this.salesList : this.typeFilter = this.timeFilter
      if(criteria.saleFilter != 'all')
        this.typeFilter = this.typeFilter.filter((sale:any) => sale.paymentMethod == criteria.saleFilter)
      this.salesEvent.emit(this.typeFilter)
    }
  }

  getWeek(date:any) {
    var startDate = new Date(date.getFullYear(), 0, 1).getTime();
    var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + days) / 7);
  }

  filterByDate(date:string) {
    this.activeFilter = date
    this.filterSales('date', date)
  }

  filterByType() {
    this.openModal = false
    this.filtersForm.value
    this.filterSales('type', this.filtersForm.value)
  }

}
