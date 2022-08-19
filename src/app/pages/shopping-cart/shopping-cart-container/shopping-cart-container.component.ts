import { Component, OnInit } from '@angular/core';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { Store } from '@ngrx/store';
import * as fromShop from '../../../app.reducer';
// import { selectproductsdetail, selectCartDetail } from '../../product-detail/state/productdetail.selector';
// import { ProductState } from '../../product-detail/state';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProductState } from '../../product-detail/state/productdetail.reducer';
import { selectCartDetail } from '../shopping-cart-item/store/shop.reducer';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';

@Component({
  selector: 'app-shopping-cart-container',
  templateUrl: './shopping-cart-container.component.html',
  styleUrls: ['./shopping-cart-container.component.css']
})
export class ShoppingCartContainerComponent implements OnInit {
  loading = false;
  totalPrice: any;
  cart: any[];
  cartitem: any;
  productDetailObject: ProductDetail[];
  form: FormGroup;
  getMasterForm: FormGroup;
  detailForm: FormGroup;
  error: any;
  PostArray: Array<any> = [];
  currentCartItem: any;
  subTotal: 0;
  total = 0;
  tax = 0;
  loginStatus: any;
  userid: string;
  constructor(private cartstore: Store<fromShop.AppState>,
    private store: Store<ProductState>,
    private local: LocalStoreService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    public authService: AuthService,
    private cartapi: CartService,
    private localStore: LocalStoreService,
    private detailToCart: DetailToCartService) {
    this.loginStatus = this.authService.currentLoginStatus;
    this.userid=localStorage.getItem('userId');
  }

  ngOnInit() {
    this.loadcartitem(this.userid);
    this.detailToCart.itemChanged.subscribe((data: any) => {
      this.cartitem = data;
    });
    // this.detailForm = this.formBuilder.group({
    //   things: this.formBuilder.array([this.createDetailForm()])
    // });
    // this.store.select(selectCartDetail).subscribe(shop => {

    //   this.totalPrice = shop.reduce((count, curItem) => {
    //     return count + (curItem.quantity * curItem.price);
    //   }, 0);

    //   this.cart = shop;
    //   if (this.cart.length === 0) {
    //     this.cart = this.local.getItem('cartItem');
    //     for (let i=0; i<this.cart.length; i++) {
    //       this.totalPrice += this.cart[i].total;
    //     }
    //   }

    // });
    // console.log(this.cart);
    // console.log(this.totalPrice);
  }

  private createDetailForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      quantity: ['', Validators.required],
    });
  }

  loadcartitem(userid) {
  
      if (this.localStore.getItem('cartItem')) {
        this.cartitem = this.localStore.getItem('cartItem');
      }

  }
}
