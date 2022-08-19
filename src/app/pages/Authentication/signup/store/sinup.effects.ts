import { Injectable } from '@angular/core';
import { createEffect, ofType, Effect, Actions } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { mergeMap, map, exhaustMap,tap, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { courseActionTypes } from './sinup.actions';
import * as fromSignupActions from './sinup.actions';
import { of, BehaviorSubject } from 'rxjs';
import { LocalStoreService } from '../../../../../../src/app/services/local-store.service';
import { AuthService } from '../../../../../../src/app/services/auth.service';
import { LocalstorageforaddressService } from 'src/app/services/localstorageforaddress.service';



@Injectable()
export class SignupEffects {
    createSigup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSignupActions.createSignup),
            exhaustMap(action =>
                this.restApi.signup(action.signup).pipe(
                    map(result => {
                        console.log(result);
                        this.localstorageforaddressService.set("getcaptchaSuccessInPhone", result.success);
                        if (result.success === true) {
                            this.toastr.success('Phone submitted!', 'Success!', { timeOut: 3000 });
                          
                          
                            // this.local.setItem('currentUser', result.data);
                            // this.currentUserSubject.next(result);
                            
                            return fromSignupActions.createSignupSuccess({ signup: result });
                        } else {
                            this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
                            return fromSignupActions.createSignupFailure({ signup: result });
                         
                            
                        }
                    }),
                )
            ),
        )
    );
    createconfirmSigup$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromSignupActions.addSignup),
        exhaustMap(action =>
            this.restApi.confirmSignup(action.signup).pipe(
                map(result => {
                    console.log(result);
                    if (result.token) {
                        this.toastr.success('Phone Signup  Successfull!', 'Success!', { timeOut: 3000 });
                        // this.currentUserSubject.next(result);
                        // console.log(this.currentUserSubject);
                        this.router.navigate(['/login']);
                        return fromSignupActions.createSignupSuccess({ signup: result });
                    } else {
                        this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
                        return fromSignupActions.createSignupFailure({ signup: result });
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
        private restApi: AuthService,
        private localstorageforaddressService:LocalstorageforaddressService,
        ) {
        // this.currentUserSubject = new BehaviorSubject<any>(local.getItem('currentUser'));
    }

}

