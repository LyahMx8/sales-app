import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-sales',
  templateUrl: './filter-sales.component.html',
  styleUrls: ['./filter-sales.component.scss']
})
export class FilterSalesComponent implements OnInit {

  public filterForm: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
