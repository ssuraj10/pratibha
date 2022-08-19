import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { Corder } from '../models/corder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorderService {

  constructor(private httpClient: HttpClient) { }
  getcorders() {
     this.httpClient.get<any>(`${environment.apiUrl}/customer-orders`).pipe(map(res => {
      return res.data;
    }));
  }
  getAll() {
    return this.httpClient.get<any>(`${environment.apiUrl}/customer-orders`).pipe(map(res => {
      return res.data;
    }));
  }
  getbyid(id: any): Observable<Corder> {
    return this.httpClient.get<any>(`${environment.apiUrl}/customer-orders/${id}`).pipe(map(res => {
      return res.data;
    }));
  }
  cancelorder(id: any,reason:any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/customer-orders/${id}/cancel`,reason).pipe(map(res => {
      return res;
    }));
  }
  // cinfirmReceipt(id: number) {
  //   return this.httpClient.put<any>(`${environment.apiUrl}/customer-orders/${id}/cancel`).pipe(map(res => {
  //     return res;
  //   }));
  // }
}
