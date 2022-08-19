import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { CompareService } from 'src/app/services/compare.service';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrls: ['./compare-product.component.css']
})
export class CompareProductComponent implements OnInit {
  compareitem: any;
  compareitemLength: any;
  getMasterForm: FormGroup;
  loading: boolean=false;

  constructor(private localStore: LocalStoreService,
    private comparedetail: CompareService,
    private detailToCart: DetailToCartService,
    private cartapi: CartService,
    public authService: AuthService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {

    this.loadcompareitem();
    this.comparedetail.itemChanged.subscribe((data: any) => {
      this.compareitem = data;
    });
  }

  loadcompareitem() {
    if (this.localStore.getItem('CompareItems')) {
      this.compareitem = this.localStore.getItem('CompareItems');
      this.compareitemLength = this.compareitem.length;
    
    }
  }
  remove(index) {
    console.log(index)
    this.comparedetail.removeFromCompare(index);
    this.ngOnInit()
  }
  onAddProductToCart(product:any) {
    if (this.authService.currentLoginStatus) {
      this.getMasterForm = this.formBuilder.group({
        productId: [product.productId?product.productId:product.id],
        quantity: [1]
      });
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
        productId: product.productId?product.productId:product.id,
        productName: product.productName?product.productName:product.name,
        productPrice: product.salesRate,
        quantity: 1,
        total: product.salesRate?product.salesRate:product.price
      };
      this.detailToCart.addToCart(item);
    }
  }



}
