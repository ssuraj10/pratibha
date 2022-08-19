import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UseraddressService } from 'src/app/services/useraddress.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { checkoutService } from 'src/app/services/checkout.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';
import { first } from 'rxjs/operators';
import { LocalStoreService } from 'src/app/services/local-store.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  userAdressList: any;
  @Input('products') products: any;
  cartlist: any;
  cartitemid: any;
  datafromlocal: any;
  currentLocation: any;
  loading: boolean;
  shippinguserid: any;
  userAdressListlength: any;
  userid: any;
  ordertotal=0;

  constructor(private router: Router,
    private restApi: UseraddressService,
    private cartapi: CartService,
    private checkoutApi: checkoutService,
    private formBuilder: FormBuilder,
    private local: LocalStoreService,
    private alertify: AlertifyService,
    private localstorageforaddressService: LocalstorageforaddressService,) { this.userid = localStorage.getItem('userId'); }
  selectedAddress: any;
  public addressId: ElementRef;
  shippingUserId: any;
  getMasterForm: FormGroup;
  isdefault: boolean;

  ngOnInit() {
    if (localStorage.getItem('cartItem')) {
      this.cartlist =JSON.parse(localStorage.getItem('cartItem'));
    }
    console.log(this.cartlist)

    this.cartlist.forEach(element => {
      this.ordertotal += Number(element.total);

    });
    console.log( this.ordertotal)
    this.userAdressList = [JSON.parse(localStorage.getItem('address')?localStorage.getItem('address'):'')];
    this.userAdressListlength = this.userAdressList.length;
    
    // this.getAddress(this.userid);
    // this.getCardData();
  }

  getCardData() {
    this.cartapi.getOnecartitem(this.userid).subscribe((data: any) => {
      this.cartlist = data.data;
      this.cartitemid = data.data.id;
      this.cartlist.forEach(element => {
        this.ordertotal += element.orderTotal;

      });
    });
    this.datafromlocal = this.localstorageforaddressService.get('address');
    this.currentLocation = this.datafromlocal.name;
  }


  getAddress(id) {
    this.restApi.getOne(id).subscribe((data: any) => {
      this.userAdressList = data.userlist;
      this.userAdressListlength = data.userlist.length;
      this.userAdressList.forEach(element => {
        if (element.isDefault === true) {
          this.isdefault = element.isDefault;
          this.shippingUserId = element.userAddressId;
        }
      });

    });
  }

  getAddressbyid(AddressId: number) {
    return this.restApi.getOne(AddressId)
      .subscribe(data => {
      });
  }

  delete(id) {
    console.log(id);
    this.restApi.delete(id).subscribe(data => {
      this.getAddress(id);
    });
  }

  onItemChange(value) {
    this.shippinguserid = value;
  }

  oncheckout() {
    console.log(this.shippingUserId);
    this.router.navigate(['/cart/payment']);
    // this.getMasterForm = this.formBuilder.group({
    //     shippingUserAddressId: [this.shippingUserId],
    //     orderNote: ['Order Placed']
    //   });
    // this.loading = true;
    //     this.checkoutApi.create(this.getMasterForm.value)
    //       .pipe(first())
    //       .subscribe(
    //         result => {
    //           if (result.success === true) {
    //             this.alertify.success('One record added !');
    //             this.local.setItem('esewa', result.data);
    //             this.router.navigate(['/cart/payment']);
    //           } else {
    //             this.alertify.error('Error !' + result.message);
    //           }
    //         },
    //       );
  }
}
