
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

export class CartService {
  constructor(private http: HttpClient) {
    this.cartItems.subscribe(item => item = items);
  }

  public CartInfo: CartItem;
  public subTotal = 0;
  // Array
  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;




  // Get Items
  public getItems(): Observable<CartItem[]> {


    const itemsStream = new Observable(observer => {
      observer.next(items);
      observer.complete();
    });

    return itemsStream as Observable<CartItem[]>;
  }


  // Get Items
  public getItemsById(itemId: number): CartItem {

    return items.find((products, index) => {
      if (products.item.itemId === itemId) {
        return items[index];
      }
    });
  }


  // Add to cart
  public addToCart(item: Item, id: number, orderTotal: number): CartItem {
    let product: CartItem;
    // checkResturant

    const hasrest = items.find((products, index) => {
      if (products.id !== null) {
        if (products.id !== id) {
          this.removeFromCart(items);
        }
      }
    });

    // If Items exist
    const hasItem = items.find((products, index) => {
      if (products.item.itemId === item.itemId && products.id === id) {
        const qty = items[index].orderTotal + orderTotal;
        if (qty <= 0) {
          items.splice(index, 1);
          localStorage.setItem('cartItem', JSON.stringify(items));
        } else {
          items[index].orderTotal = qty;
        }
        return true;
      }
    });
    // If Items does not exist (Add New Items)
    // if (!hasItem) {
    //     product = { item, id, orderTotal };
    //     items.push(product);
    // }

    localStorage.setItem('cartItem', JSON.stringify(items));
    return product;
  }





  // Update Cart Value
  public updateCartQty(item: CartItem, orderTotal: number): CartItem | boolean {

    return items.find((products, index) => {
      if (products.item.itemId === item.item.itemId) {
        const qty = items[index].orderTotal + orderTotal;
        if (qty <= 0) {
          items.splice(index, 1);
          localStorage.setItem('cartItem', JSON.stringify(items));
        } else {
          items[index].orderTotal = qty;
          localStorage.setItem('cartItem', JSON.stringify(items));
        }
        return true;
      }
    });
  }






  public removeItem(id: number) {


    for (let i = 0; i < items.length; i++) {

      if (items[i].id !== id) {
        items.splice(i, 1);
        localStorage.setItem('cartItem', JSON.stringify(items));
      }
    }

  }





  // decrement Cart Value

  public decrementCartorderTotal(item: Item, orderTotal: number): CartItem | boolean {

    return items.find((products, index) => {
      if (products.item.itemId === item.itemId) {
        const qty = items[index].orderTotal - orderTotal;
        items[index].orderTotal = qty;
        return true;
      }
    });
  }



  // Removed in cart
  public removeFromCart(item: CartItem) {

    if (item === undefined) { return false; }
    const index = items.indexOf(item);
    items.splice(index, 1);
    localStorage.setItem('cartItem', JSON.stringify(items));
  }

  // Total amount
  //   public getTotalAmount(): number {
  //     const jsontems = JSON.parse(localStorage.getItem('cartItem')) || [];
  //     this.subTotal = 0;
  //     // tslint:disable-next-line: prefer-for-of
  //     for (let i = 0; i < jsontems.length; i++) {
  //       this.CartInfo = jsontems[i];
  //       this.subTotal += this.CartInfo.item.rate * this.CartInfo.orderTotal;
  //     }
  //     return this.subTotal;
  //   }
  
  create(cartitem: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
      params: cartitem
    };
    return this.http.post(`${environment.apiUrl}/cart`,null,  httpOptions);
  }

  getcartitem() {
    return this.http.get<any>(`${environment.apiUrl}/cart`).pipe(map(res => {
      return res;
    }));

  }
  getOnecartitem(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/usercart/${id}`).pipe(map(res => {
        return res;
    }));
}

  delete(deleteItem: any): any {
    return this.http.delete(`${environment.apiUrl}/cart`, deleteItem);
  }

  remove(id): any {
    return this.http.delete(`${environment.apiUrl}/cart/${id}`);
  }
  updatequantity(quantity: any): any {
    return this.http.put(`${environment.apiUrl}/cart/update-item-quantity`, quantity);
  }
  ApplyToken(id: number, coupon: any): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/cart/api/carts/${id}/apply-coupon`, coupon);
  }

}
