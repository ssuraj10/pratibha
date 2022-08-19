// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Store, Action } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { tap, catchError, mergeMap, map } from 'rxjs/operators';
// import { ProductState } from '.';
// import { ProductService } from 'src/app/services/product.service';
// import * as fromProduct from 'src/app/pages/state/product.action'
// import * as fromError from 'src/app/Store/Action/error.action';
// import { RemoveError, AddError } from 'src/app/Store/Action/error.action';
// import { LoadProductDetail, ProductDetailActionTypes, LoadProductDetailSuccess } from './productdetail.action';
// @Injectable()
// export class ProductDetailEffects {
//     constructor(
//         private action$: Actions,
//         private store: Store<ProductState>,
//         private api: ProductService
//     ) { }

//     @Effect()
//     loadProduct$: Observable<Action> = this.action$.pipe(
//         ofType<LoadProductDetail>(ProductDetailActionTypes.LOAD_PRODUCTDETAIL),
//         tap(() => this.store.dispatch(new RemoveError())),
//         mergeMap(() =>
//             this.api.getProductAll().pipe(
//                 map(products => new LoadProductDetailSuccess(products)),
//                 catchError(err => of(new AddError(err.error)))
//             )
//         )
//     );
// }


import { Injectable, SimpleChange } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as prodcutActions from './productdetail.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ProductService } from 'src/app/services/product.service';



@Injectable()
export class ProductDetailEffects {

    @Effect()
    LoadProducts$: Observable<Action> = this.actions$.pipe(
        ofType<prodcutActions.LoadProducts>(
            prodcutActions.ProductActionTypes.LOAD_PRODUCTS
        ),
        mergeMap((action: prodcutActions.LoadProducts) =>
            this.restApi.getproductWidgetAll().pipe(
                map(
                    (Products: any[]) =>
                        new prodcutActions.LoadProductsSuccess(Products)
                ),
                catchError(err => of(new prodcutActions.LoadProductsFail(err)))
            )
        )
    );

    @Effect()
    LoadProduct$: Observable<Action> = this.actions$.pipe(
        ofType<prodcutActions.LoadProduct>(
            prodcutActions.ProductActionTypes.LOAD_PRODUCT
        ),
        mergeMap((action: prodcutActions.LoadProduct) =>
            this.restApi.getbyid(action.payload).pipe(
                map(
                    (Product: any) =>
                        new prodcutActions.LoadProductSuccess(Product)
                ),
                catchError(err => of(new prodcutActions.LoadProductsFail(err)))
            )
        )
    );
    constructor(private actions$: Actions,
        private router: Router,
        private restApi: ProductService,
        private toastr: ToastrService) { }

}
