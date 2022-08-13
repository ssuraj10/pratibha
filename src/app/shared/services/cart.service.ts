import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemChanged = new EventEmitter<any>();
  cartItems = [];

  constructor() { }

  addSingle(item: any) {
    if (!this.cartItems.some((value) => value.name === item.name)) {
      this.cartItems.push(item);
      this.itemChanged.emit(item);
      return true;
    }
    else {
      return false;
    }
  }
  removeCartItem(index: any) {
    this.cartItems.splice(index, 1);
  }

}
