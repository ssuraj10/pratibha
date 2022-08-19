import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromShop from '../../../app.reducer';
import { IncrementCartQuantity, DecrementCartQuantity, RemoveProductFromCart } from './store/shop.action';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { DatePipe } from '@angular/common';
// import { ProductState } from '../../product-detail/state';
import * as fromCartState from '../shopping-cart-item/store/shop.reducer';
import { CartState } from './store/shop.reducer';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Key } from 'protractor';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { first } from 'rxjs/operators';
import { ProductState } from '../../product-detail/state/productdetail.reducer';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input('products') products: any;
  public show: boolean = false;
  cartData: [];
  form: FormGroup;
  error: any;
  loading = false;
  cartitem: any;
  subTotal: 0;
  total = 0;
  tax = 0;
  totalPrice = 0;
  getProductIdForm: FormGroup;
  productidnumber: number;
  // ProductsId: Array<any> = [];
  ProductsId = new FormArray([]);
  loginStatus: any;
  getMasterForm: FormGroup;
  cartitemid: any;
  datafromlocal: any;
  currentLocation: any;
  cartlist: any;
  cartlistlength: any;
  userid: string;
  addSkill() {
    const group = new FormGroup({
      productIds: new FormControl('')
    });
    this.ProductsId.push(group);
  }
  constructor(private store: Store<ProductState>,
    private cartStore: Store<CartState>,
    private local: LocalStoreService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private cartapi: CartService,
    private authservice: AuthService,
    private detailToCart: DetailToCartService,
    private localstorageforaddressService: LocalstorageforaddressService,
    private localStore: LocalStoreService) {
    this.loginStatus = this.authService.currentLoginStatus;
    this.userid=localStorage.getItem('userId');
    this.datafromlocal = this.localstorageforaddressService.get("address");
  }

  ngOnInit() {
    if (this.products) {
      for (let i = 0; i < this.products.length; i++) {
        this.totalPrice += Number(this.products[i].productPrice);
      }
    }
    this.createForm();
    this.getCardData(this.userid);
  }

  toggle() {
    this.show = !this.show;
  }
  getCardData(userid) {
    this.cartapi.getOnecartitem(userid).subscribe((data: any) => {
      this.cartlist = data.data;
      this.cartitemid = data.data.id;
    });
    this.datafromlocal = this.localstorageforaddressService.get("address");
    if (this.datafromlocal)
      this.currentLocation = this.datafromlocal.name;
  }
  incrementSets(index: any, id) {
    this.products[index].quantity++;
    this.products[index].orderTotal += Number(this.products[index].productPrice);
    this.totalPrice +=Number(this.products[index].productPrice);
    this.detailToCart.afterLogin(this.products);
   
  }

  decrementSets(index: any, id) {
    if( this.products[index].quantity > 1){
      this.products[index].quantity--;
      console.log(this.products[index].quantity);
      this.products[index].orderTotal -= this.products[index].productPrice;
      this.totalPrice -= this.products[index].productPrice;
      this.detailToCart.afterLogin(this.products);
    }
   
  }

  removeCartItem(id, index) {
 
      this.detailToCart.removeFromCart(index);
      this.totalPrice -= this.products[index].total;
    
  }

  createForm() {

    this.getMasterForm = this.formBuilder.group({

      couponCode: new FormControl('', Validators.required),
    });
  }
  ApplyToken() {
    if (this.loginStatus === true) {
      console.log(this.cartitemid);
      console.log(this.getMasterForm.value);


      this.cartapi.ApplyToken(this.cartitemid, this.getMasterForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertify.success('coupon Applied !');
            this.ngOnInit();
          },
          error => {
            this.error = error;
            this.alertify.error(this.error);
            this.loading = false;
          }
        );
    }
  }
}
