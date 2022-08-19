import { Action } from '@ngrx/store';
import { Product } from 'src/app/models/product';


export enum ProductActionTypes {
    LOAD_PRODUCT = '[Product] Load product',
    LOAD_PRODUCT_SUCCESS = '[Product] Load product success',
  
  }

  export class LoadProduct implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT;
  }
  
  export class LoadProductSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS;
    constructor(public payload: Product[]) {}
  }
  

  export type ProductAction =
  | LoadProduct
  | LoadProductSuccess