import { Component } from '@angular/core';

@Component({
  selector: 'app-my-business',
  templateUrl: './my-business.component.html',
  styleUrls: ['./my-business.component.scss']
})
export class MyBusinessComponent {
  public itemsList:any = []
  public date:any
  public filter:any

  constructor() { }

  updateList(event:any){
    setTimeout(() => {
      this.itemsList = event
    },500)
  }

  currentDate(event:Date) {
    setTimeout(() => {
      this.date = event
    },500)
  }

  updateFilter(event:string) {
    setTimeout(() => {
      this.filter = event
    },500)
  }

}
