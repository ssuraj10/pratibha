import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';
import { AppState } from '.';
import { ProductService } from 'src/app/services/product.service';
import * as fromProduct from 'src/app/pages/state/product.action'
import * as fromError from 'src/app/Store/Action/error.action';
import { LoadProduct, ProductActionTypes, LoadProductSuccess } from 'src/app/pages/state/product.action';
import { RemoveError, AddError } from 'src/app/Store/Action/error.action';
@Injectable()
export class ProductEffects {
    constructor(
        private action$: Actions,
        private store: Store<AppState>,
        private api: ProductService
    ) { }

    @Effect()
    loadProduct$: Observable<Action> = this.action$.pipe(
        ofType<LoadProduct>(ProductActionTypes.LOAD_PRODUCT),
        tap(() => this.store.dispatch(new RemoveError())),
        mergeMap(() =>
            this.api.getAll().pipe(
                map(products => new LoadProductSuccess(products)),
                catchError(err => of(new AddError(err.error)))
            )
        )
    );
}