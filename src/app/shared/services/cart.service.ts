import { Injectable, EventEmitter } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CartService {
  itemChanged = new EventEmitter<any>();
  cartItems = [];
  cartCount = 0;
  public subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public countSubject: BehaviorSubject<any> = new BehaviorSubject<number>(0);
  constructor(private toastr: ToastrService) { }

  addSingle(item: any) {
    if (!this.cartItems.some((value) => value.name === item.name)) {
      this.cartItems.push(item);
      this.itemChanged.emit(item);
      this.cartCount++;
      return true;
    } else {
      return false;
    }
  }
  addItem(item: any) {
    if (!this.cartItems.some((value) => value.menu_id === item.menu_id)) {
      this.cartItems.push(item);
      this.cartCount++;
      this.countSubject.next(this.cartCount)
      this.itemChanged.emit(this.cartItems);
      this.toastr.success('Item Added In Cart !',
        'Success', {
        enableHtml: true,
        closeButton: true,
        timeOut: 10000
      });
      // this.toastr.success('Item Added In Cart !',  {enableHtml: true,
      // closeButton: true,
      // timeOut: 10000});
      return this.subject.next(this.cartItems);
    } else {
      this.toastr.warning('Item Already In Cart !');
    }

    // this.cartItems.push(item);



  }
  removeCartItem(index: any) {

    this.cartItems.splice(index, 1);
    this.cartCount--;
    this.itemChanged.emit(this.cartItems);
    this.toastr.success('Item Removed !');
    return this.countSubject.next(this.cartCount);
  }

  getCartCount() {
    return this.countSubject.next(this.cartCount);

  }
  afterLogin(item) {
    this.itemChanged.emit(item);
    return this.subject.next(item);
  }
}
