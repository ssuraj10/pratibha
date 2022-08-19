import { Injectable } from '@angular/core';
import { createEffect, ofType, Effect, Actions } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { mergeMap, map, exhaustMap,tap, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as fromPaswordForgetResetByEmail from './forgetResetPasswordByEmail.actions';
import { of, BehaviorSubject } from 'rxjs';
import { LocalStoreService } from '../../../../services/local-store.service';
import { AuthService } from '../../../../services/auth.service';



@Injectable()
export class ForgetResetByEmailEffects {
    forgotPasswordByEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPaswordForgetResetByEmail.createForgetEmailRequest),
            exhaustMap(action =>
                this.restApi.forgotPasswordByEmail(action.forgotPasswordByEmail).pipe(
                    map(result => {
                        console.log(result);
                        if (result.success === true) {
                            this.toastr.success('Code Sent to Email For Password Change!', 'Success!', { timeOut: 3000 });
                            // this.local.setItem('currentUser', result.data);
                            // this.currentUserSubject.next(result);
                            // console.log(this.currentUserSubject);
                            
                            return fromPaswordForgetResetByEmail.createForgetEmailRequestSuccess({ forgotPasswordByEmail: result });
                        } else {
                            this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
                            return fromPaswordForgetResetByEmail.createForgetEmailRequestFaliure({ forgotPasswordByEmail: result });
                        }
                    }),
                )
            ),
        )
    );

    resetPasswordByEmail$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromPaswordForgetResetByEmail.CreateResetPasswordByEmail),
        mergeMap(action =>
            this.restApi.resetPasswordByEmail(action.resetPasswordByEmail).pipe(
                map(result => {
                    console.log(result);
                    if (result.success === true) {
                        this.toastr.success('Password Change by Email!', 'Success!', { timeOut: 3000 });
                        this.router.navigate(['/login']);
                        return fromPaswordForgetResetByEmail.CreateResetPasswordByEmailSuccess({ resetPasswordByEmail: result });
                    } else {
                        this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
                        return fromPaswordForgetResetByEmail.CreateResetPasswordByEmailFailure({ resetPasswordByEmail: result });
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

