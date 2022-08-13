import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  foods = [];
  tax = 0;
  subTotal = 0;
  total = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.itemChanged.subscribe((data: any) => {
      this.foods.push(data);
      this.calculations();
    });

  }

  calculations() {
    this.subTotal = 0;
    for (let i = 0; i < this.foods.length; i++) {
      this.subTotal += this.foods[i].price * this.foods[i].set;
    }
    this.tax = this.subTotal * 0.10;
    this.total = this.subTotal + this.tax;
  }

  onDeleteItem(index: any) {
    this.foods[index].set = 1;
    this.cartService.removeCartItem(index);
    this.foods.splice(index, 1);
    this.calculations();
  }

  incrementSets(index: any) {
    this.foods[index].set++;
    this.subTotal += this.foods[index].price;
    this.tax = this.subTotal * 0.10;
    this.total = this.subTotal + this.tax;
  }

  decrementSets(index: any) {
    this.foods[index].set--;
    this.subTotal -= this.foods[index].price;
    this.tax = this.subTotal * 0.10;
    this.total = this.subTotal + this.tax;
  }

}
