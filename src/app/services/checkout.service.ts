
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subscriber, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { Item } from '../models/Item';



// Get item from Localstorage
const items = JSON.parse(localStorage.getItem('cartItem')) || [];

@Injectable({
  providedIn: 'root'
})

export class checkoutService {
  constructor(private http: HttpClient) {
  }

  create(cartitem: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/checkout/cart`, cartitem);
  }
  createesewaSucess(esewaitem: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/checkout/finished`, esewaitem);
  }

  getcartitem() {
    return this.http.get<any>(`${environment.apiUrl}/cart`).pipe(map(res => {
      return res.data;
    }));

  }

  delete(deleteItem: any): any {
    return this.http.delete(`${environment.apiUrl}/cart/remove-items`, deleteItem);
  }

  remove(id): any {
    return this.http.delete(`${environment.apiUrl}/cart/remove-product/${id}`);
  }
  ApplyToken(id: number, coupon: any): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/cart/api/carts/${id}/apply-coupon`,coupon);
   }

   getOrderdetail(id: number){
    return this.http.get(`${environment.apiUrl}/customer-orders/${id}`).pipe(map(res=>{
        return res;
    }));
   }

}
