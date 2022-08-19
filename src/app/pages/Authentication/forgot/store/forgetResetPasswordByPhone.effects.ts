import { Injectable } from '@angular/core';
import { createEffect, ofType, Effect, Actions } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { mergeMap, map, exhaustMap,tap, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as fromPaswordForgetResetByPhone from './forgetResetPasswordByPhone.actions';
import { of, BehaviorSubject } from 'rxjs';
import { LocalStoreService } from '../../../../services/local-store.service';
import { AuthService } from '../../../../services/auth.service';



@Injectable()
export class ForgetResetByPhoneEffects {
    forgotPasswordByPhone$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPaswordForgetResetByPhone.createForgetPhoneRequest),
            exhaustMap(action =>
                this.restApi.forgotPasswordByPhone(action.forgotPasswordByPhone).pipe(
                    map(result => {
                        console.log(result);
                        if (result.success === true) {
                            this.toastr.success('Code Sent to Phone For Password Change!', 'Success!', { timeOut: 3000 });
                            // this.local.setItem('currentUser', result.data);
                            // this.currentUserSubject.next(result);
                            // console.log(this.currentUserSubject);
                            
                            return fromPaswordForgetResetByPhone.createForgetPhoneRequestSuccess({ forgotPasswordByPhone: result });
                        } else {
                            this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
                            return fromPaswordForgetResetByPhone.createForgetPhoneRequestFaliure({ forgotPasswordByPhone: result });
                        }
                    }),
                )
            ),
        )
    );

    resetPasswordByPhone$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromPaswordForgetResetByPhone.CreateResetPasswordByPhone),
        mergeMap(action =>
            this.restApi.resetPasswordByPhone(action.resetPasswordByPhone).pipe(
                map(result => {
                    console.log(result);
                    if (result.success === true) {
                        this.toastr.success('Password Change by Phone!', 'Success!', { timeOut: 3000 });
                        this.router.navigate(['/login']);
                        return fromPaswordForgetResetByPhone.CreateResetPasswordByPhoneSuccess({ resetPasswordByPhone: result });
                    } else {
                        this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
                        return fromPaswordForgetResetByPhone.CreateResetPasswordByPhoneFailure({ resetPasswordByPhone: result });
                    }
                }),
            )
        ),
    )
);
    currentUserSubject2: BehaviorSubject<any>;

    // public get currentUserValue(): any {
    //     return this.currentUserSubject.value;
    // }

    constructor(private actions$: Actions,
        private toastr: ToastrService,
        private router: Router,
        private local: LocalStoreService,
        private restApi: AuthService) {
        // this.currentUserSubject = new BehaviorSubject<any>(local.getItem('currentUser'));
    }

}

