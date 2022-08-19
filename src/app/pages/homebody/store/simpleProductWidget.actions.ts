import { Action } from '@ngrx/store';
import { SimpleProductWidget } from './simpleProductWidget.model';
import { ProductDetail } from 'src/app/models/ProductDetail';



export enum SimpleProductTypes {
    LOAD_SIMPLEPRODUCTWIDGETS = 'LOAD_SIMPLEPRODUCTWIDGETS',
    LOAD_SIMPLEPRODUCTWIDGETS_SUCCESS = 'LOAD_SIMPLEPRODUCTWIDGETS SUCCESS',
    LOAD_SIMPLEPRODUCTWIDGETS_FAIL = 'LOAD_SIMPLEPRODUCTWIDGETS FAIL',


    LOAD_SIMPLEPRODUCTWIDGET = 'LOAD_SIMPLEPRODUCTWIDGET',
    LOAD_SIMPLEPRODUCTWIDGET_SUCCESS = 'LOAD_SIMPLEPRODUCTWIDGET SUCCESS',
    LOAD_SIMPLEPRODUCTWIDGET_FAIL = 'LOAD_SIMPLEPRODUCTWIDGET FAIL'

}

export class LoadSimpleProductWidgets implements Action {
    readonly type = SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGETS;
}

export class LoadSimpleProductWidgetsSuccess implements Action {
    readonly type = SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGETS_SUCCESS;
    constructor(public payload: SimpleProductWidget[]) { }
}
export class LoadSimpleProductWidgetsFail implements Action {
    readonly type = SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGETS_FAIL;
    constructor(public payload: string) { }
}

export class LoadSimpleProductWidget implements Action {
    readonly type = SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGET;

    constructor(public payload: number) { }
}

export class LoadSimpleProductWidgetSuccess implements Action {
    readonly type = SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGET_SUCCESS;

    constructor(public payload: any) { }
}

export class LoadSimpleProductWidgesFail implements Action {
    readonly type = SimpleProductTypes.LOAD_SIMPLEPRODUCTWIDGET_FAIL;
  
    constructor(public payload: string) { }
  }



  export type Actions =
  | LoadSimpleProductWidgets
  | LoadSimpleProductWidgetsSuccess
  | LoadSimpleProductWidgetsFail
  | LoadSimpleProductWidget
  | LoadSimpleProductWidgetSuccess
  | LoadSimpleProductWidgesFail