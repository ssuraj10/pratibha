import { Injectable, EventEmitter } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DetailToCartService {

  itemChanged = new EventEmitter<any>();
  cartItems = [];

  constructor(private local: LocalStoreService,
    private toastr: ToastrService) {
    const items = JSON.parse(localStorage.getItem('cartItem'));
    if (items) {
      for (let i = 0; i < items.length; i++) {
        this.cartItems.push(items[i]);
      }
    }
  }

  addToCart(item) {
    if (!this.cartItems.some((value) => value.productName === item.productName)) {
      this.cartItems.push(item);
      this.local.setItem('cartItem', this.cartItems);
      this.itemChanged.emit(this.cartItems);
      this.toastr.success('Item Added In Cart !');
    } 
  }

  removeFromCart(index) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItem', JSON.stringify(this.cartItems));
    this.itemChanged.emit(this.cartItems);
    this.toastr.success('Item Removed !');
  }

  afterLogin(item) {
    this.itemChanged.emit(item);
  }

  afterLogout() {
    console.log(this.local.getItem('cartItem'));
    this.itemChanged.emit(this.local.getItem('cartItem'));
  }
}
