import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as SimpleProductWidgetActions from './simpleProductWidget.actions';
import { ProductWidgetsService } from 'src/app/services/ProductWidget.service';
import { SimpleProductWidget } from './simpleProductWidget.model';
import { ProductService } from 'src/app/services/product.service';

@Injectable()
export class SimpleProductWidgetEffects {
    constructor(private actions$: Actions,
        private router: Router,
        private restApi: ProductWidgetsService,
        private productApi:ProductService) { }



    @Effect()
    loadOptions$: Observable<Action> = this.actions$.pipe(
        ofType<SimpleProductWidgetActions.LoadSimpleProductWidgets>(
            SimpleProductWidgetActions.SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGETS
        ),
        mergeMap((action: SimpleProductWidgetActions.LoadSimpleProductWidgets) =>
            this.restApi.getAll(1).pipe(
                map(
                    (SimpleProductWidgets: SimpleProductWidget[]) =>
                        new SimpleProductWidgetActions.LoadSimpleProductWidgetsSuccess(SimpleProductWidgets)
                ),
                catchError(err => of(new SimpleProductWidgetActions.LoadSimpleProductWidgesFail(err)))
            )
        )
    );

    @Effect()
    loadOption$: Observable<Action> = this.actions$.pipe(
        ofType<SimpleProductWidgetActions.LoadSimpleProductWidget>(
            SimpleProductWidgetActions.SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGET
        ),
        mergeMap((action: SimpleProductWidgetActions.LoadSimpleProductWidget) =>
            this.productApi.getbyid(action.payload).pipe(
                map(
                    (SimpleProductwidgets: any) =>
                        new SimpleProductWidgetActions.LoadSimpleProductWidget(SimpleProductwidgets)
                ),
                catchError(err => of(new SimpleProductWidgetActions.LoadSimpleProductWidget(err)))
            )
        )
    );
}

