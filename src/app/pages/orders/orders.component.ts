import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/pipes/order';
import { map, first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CorderService } from 'src/app/services/corder.service';
import { FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  corders: any = [];
  cordersidlist:any;
  orderid: any;
  getMasterForm: any;
  loading: boolean;
  error: any;
  constructor(private route: ActivatedRoute,
    private orderApi: CorderService,
    private router: ActivatedRoute,
    private formBuilder:FormBuilder,
    private alertify:AlertifyService) { }
  metaData(order: Order) {
  }
  ngOnInit() {
    this.orderid = this.router.snapshot.params.id;
    this.loadOrderByid(this.orderid);
    // this.route.data
    // .pipe(
    //   map(data => data.corders)
    // )
    // .subscribe(res => this.corders = res);
    // this.corders = this.route.snapshot.data.product;
  }

  loadOrderByid(id) {
    this.orderApi.getbyid(id).subscribe(result => {
      this.cordersidlist = result;
      console.log(this.cordersidlist);
    });
  }

  onCancelOrder(orderid) {
      this.getMasterForm = this.formBuilder.group({
        reason: [''],
      });
      console.log(this.getMasterForm.value);
      this.loading = true;
      this.alertify.confirm('Are you sure you want to add?', () => {
        this.orderApi.cancelorder(orderid,this.getMasterForm.value)
          .pipe(first())
          .subscribe(
            data => {
                this.alertify.success('One order Cancel !');
                this.ngOnInit();
              }, 
              error => {
                this.error = error;
                this.alertify.error(this.error);
                this.loading = false;
              });
            },
          );
  }


}
