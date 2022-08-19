import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as deliveryAddressAction from './delivery-address.actions';
import { UserAddress } from './delivery-address.model';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { UseraddressService } from 'src/app/services/useraddress.service';



@Injectable()
export class DeliveryAddressEffects {
  @Effect()
  createdeliveryAddress$: Observable<Action> = this.actions$.pipe(
    ofType<deliveryAddressAction.CreateUserAddress>(
        deliveryAddressAction.DeliveryAddressActionTypes.CREATE_DELIVERYADDRESS 
    ), map((action: deliveryAddressAction.CreateUserAddress) => action.payload),
    mergeMap((deliveryaddress: UserAddress) =>
      this.restApi.create(deliveryaddress).pipe(
        map(
          (newDeliveyAddress: any) => {
            if (newDeliveyAddress.code === 0) {
              console.log(newDeliveyAddress.success);
              // this.toastr.success('Delivery Address is Confirmed!', 'Success!', { timeOut: 3000 });
              this.router.navigateByUrl('/Checkout');
              return new deliveryAddressAction.CreateUserAddressSuccess(newDeliveyAddress);
            } else {
              this.toastr.error(newDeliveyAddress.message, 'Error!', { timeOut: 3000 });
              return new deliveryAddressAction.CreateUserAddressFail(newDeliveyAddress);
            }
          }
        )),
    ),
  );

  
  constructor(private actions$: Actions,
    private router: Router,
    private restApi: UseraddressService,
    private toastr: ToastrService) { }

}
