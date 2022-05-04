import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../_models/sales.model';

@Injectable({
  providedIn: 'root'
})

export class SalesService {

  constructor(
    private http: HttpClient
  ) { }

  salesData(): Observable<Sale> {
    return this.http.get<Sale>(`../../assets/data/sales.jsonc`)
  }
}
