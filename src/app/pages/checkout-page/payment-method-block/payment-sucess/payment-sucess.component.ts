import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { checkoutService } from 'src/app/services/checkout.service';
import { LocalStoreService } from 'src/app/services/local-store.service';

@Component({
  selector: 'app-payment-sucess',
  templateUrl: './payment-sucess.component.html',
  styleUrls: ['./payment-sucess.component.css']
})
export class PaymentSucessComponent implements OnInit {
  esewaiddetail: any;
  getMasterForm: any;
  loading: boolean;

  constructor(private checkoutApi: checkoutService,
    private localStore: LocalStoreService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,) { this.esewaiddetail = this.localStore.getItem('esewa'); }

  ngOnInit(): void {
    this.getMasterForm = this.formBuilder.group({
      paymentMethod: [2],
      paymentAmount: [this.esewaiddetail.orderTotal],
    });
    this.loading = true;
    console.log(this.getMasterForm.value)

    this.checkoutApi.createesewaSucess(this.getMasterForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('payment', 'Successful', { timeOut: 3000 });
          this.localStore.clear('esewa');
        },
      );
  

   


  }

}
