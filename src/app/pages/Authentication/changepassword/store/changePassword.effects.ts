import { Injectable } from '@angular/core';
import { createEffect, ofType, Effect, Actions } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { mergeMap, map, exhaustMap,tap, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as fromSignupActions from './changePassword.actions';
import { of, BehaviorSubject } from 'rxjs';
import { LocalStoreService } from '../../../../services/local-store.service';
import { AuthService } from '../../../../services/auth.service';



@Injectable()
export class ChangePasswordEffects {
    createChagnePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSignupActions.createChangePassword),
            exhaustMap(action =>
                this.restApi.changePassword(action.changePassword).pipe(
                    map(result => {
                        console.log(result);
                        if (result.success === true) {
                            this.toastr.success('Phone submitted!', 'Success!', { timeOut: 3000 });
                            // this.local.setItem('currentUser', result.data);
                            // this.currentUserSubject.next(result);
                            // console.log(this.currentUserSubject);
                            this.router.navigateByUrl('/login');
                            
                            return fromSignupActions.createChangePasswordSuccess({ changePassword: result });
                        } else {
                            this.toastr.error(result.message, 'Error!', { timeOut: 3000 });
                            return fromSignupActions.createChangePasswordFailure({ changePassword: result });
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

