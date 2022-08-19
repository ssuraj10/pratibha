import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { checkoutService } from 'src/app/services/checkout.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT ,Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import KhaltiCheckout from "khalti-checkout-web";


@Component({
  selector: 'app-payment-method-block',
  templateUrl: './payment-method-block.component.html',
  styleUrls: ['./payment-method-block.component.css']
})
export class PaymentMethodBlockComponent implements OnInit {
  Id: any;
  paymenttype: any;
  cartlist: any;
  ordertotal: number= 0;
  constructor(private formBuilder: FormBuilder,
   
    private alertify: AlertifyService,
    private checkoutApi: checkoutService,
    private localStore: LocalStoreService,
    private Activerouter: ActivatedRoute,
    private router: Router,
    private cartapi: CartService,
    private http: HttpClient,
    private toastr: ToastrService,
    private location:Location,
    @Inject(DOCUMENT) private document: Document) { this.esewaiddetail = this.localStore.getItem('esewa'); }
  viewMode;
  getMasterForm: FormGroup;
  loading: boolean;
  orderlist: any;
  orderid: any;
  esewaiddetail: any;
  esewaorderid: any;
  form: FormGroup;



  ngOnInit(): void {
 
    this.viewMode = 'tab3';
    this.Id = this.Activerouter.snapshot.queryParams;
    if (localStorage.getItem('cartItem')) {
      this.cartlist =JSON.parse(localStorage.getItem('cartItem'));
    }
    console.log(this.cartlist)

    this.cartlist.forEach(element => {
      this.ordertotal = this.ordertotal + Number(element.total);

    });
    console.log(  this.ordertotal)



  }




 






  onItemChange(value) {
    console.log(value)
    this.paymenttype = value;

  }

  payincash() {

  
    this.loading = true;
    
    this.alertify.Confirm('Are you Paying with cash?','ok', () => {
      this.toastr.success('payment', 'Successful', { timeOut: 3000 });
      this.router.navigateByUrl('/');
      localStorage.clear();
    });

  }

  paymentclick(name: any) {
    console.log(name);

    switch (name) {
      
      case "paydelivery":
        {
          this.payincash();
          break;
        }

      default: {
        this.payincash();
        break;
      }

    }

  }

}
