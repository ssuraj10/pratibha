import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as signInActions from './login.actions';
import { mergeMap, map, catchError, first } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DetailToCartService } from 'src/app/services/detail-to-cart.service';
// import * as logUserName from 'src/app/layout/header/header.component/';


@Injectable()
export class SignInEffects {
  @Effect()
  CreateSignIn$: Observable<Action> = this.actions$.pipe(
    ofType<signInActions.CreateSignIn>(
      signInActions.SignInActionTypes.CREATE_SIGNIN
    ), map((action: signInActions.CreateSignIn) => action.payload),
    mergeMap((signIn: any) =>
      this.restApi.signin(signIn).pipe(
        map(
          (result: any) => {
            if (result.data.token) {
              // this.cartApi.getcartitem().subscribe((datas: any) => {
              //   this.detailToCart.afterLogin(datas.items);
              // });
              this.toastr.success('Login Successful!', 'Welcome! ' + result.data.name, { timeOut: 3000 });
              this.local.setItem('currentUser', result.data.token);
              this.local.setItem('fullName', result.data.name);
            
              this.local.setItem('loginStatus', true);
              this.router.navigateByUrl('/');
              // this.logUser.getalluser();
              return new signInActions.CreateSignInSuccess(result);
            } else {
              this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
              this.local.setItem('loginStatus', false);
              return new signInActions.CreateSignInFail(result);
            }
          }
        )),
    ),
  );

  constructor(private actions$: Actions,
    private router: Router,
    private restApi: AuthService,
    private local: LocalStoreService,
    private cartApi: CartService,
    private detailToCart: DetailToCartService,
    private toastr: ToastrService) {
  }


}
