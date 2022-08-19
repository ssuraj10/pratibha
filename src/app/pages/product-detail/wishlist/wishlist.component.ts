import { Component, OnInit } from '@angular/core';
import { WishListService } from 'src/app/services/wishlist.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { first } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any;
  wishlistid: any;
  getMasterForm: any;
  loading: boolean;
  wishlistlength: any;

  constructor(private WishlistApi: WishListService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private cartapi: CartService,
    private detailToCart: DetailToCartService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getwishlist()
  }
  getwishlist() {
    this.WishlistApi.getAll().subscribe((data: any) => {
      this.wishlist = data;
      this.wishlistlength = data.length;
    
    });
  }

  deletelist(wishlistid: number) {
 
      this.WishlistApi.delete(wishlistid)
        .pipe(first())
        .subscribe(() => this.ngOnInit());
      this.alertify.success('deleted !');
  }

  onAddProductToCart(productId, productName, salesRate) {
    if (this.authService.currentLoginStatus) {
      this.getMasterForm = this.formBuilder.group({
        productId: [productId],
        quantity: [1]
      });
      console.log(this.getMasterForm.value);
      this.loading = true;
      this.cartapi.create([this.getMasterForm.value])
        .pipe(first())
        .subscribe(
          data => {
            if (data.success === true) {
              this.cartapi.getcartitem().subscribe((datas: any) => {
                this.detailToCart.afterLogin(datas.items);
              });
              this.alertify.success('One item added !');
            } else {
              this.alertify.error('Error !' + data.message);
            }
            this.ngOnInit();
          },
        );
    } else {
      const item = {
        productId: productId,
        productName: productName,
        productPrice: salesRate,
        quantity: 1,
        total: salesRate
      };
      this.detailToCart.addToCart(item);
    }
  }


}
