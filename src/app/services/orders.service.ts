import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Orders } from '../models/orders';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<any>(`${environment.apiUrl}/orders`).pipe(map(res => {
      return res.data;
    }));
  }
}
