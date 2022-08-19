// import { Action } from '@ngrx/store';
// import { ProductDetail, cartItem } from 'src/app/models/ProductDetail';


// export enum ProductDetailActionTypes {
//   LOAD_PRODUCTDETAIL = '[Product] Load productdetail',
//   LOAD_PRODUCTDETAIL_SUCCESS = '[Product] Load productdetail success',

//   CREATE_PRODUCTDETAIL = '[Product] Create productdetail',
//   CREATE_PRODUCTDETAIL_SUCCESS = '[Product] Create productdetail success',

//   ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
//   REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',

//   INCREMENT_CART_ITEM_QUANTITY = 'INCREMENT_CART_ITEM_QUANTITY',
//   DECREMENT_CART_ITEM_QUANTITY = 'DECREMENT_CART_ITEM_QUANTITY'

// }

// export class LoadProductDetail implements Action {
//   readonly type = ProductDetailActionTypes.LOAD_PRODUCTDETAIL;
// }

// export class LoadProductDetailSuccess implements Action {
//   readonly type = ProductDetailActionTypes.LOAD_PRODUCTDETAIL_SUCCESS;
//   constructor(public payload: ProductDetail[]) { }
// }
// export class CreateProductDetail implements Action {
//   readonly type = ProductDetailActionTypes.CREATE_PRODUCTDETAIL;
//   constructor(public payload: cartItem) { }
// }

// export class CreateProductDetailSuccess implements Action {
//   readonly type = ProductDetailActionTypes.CREATE_PRODUCTDETAIL_SUCCESS;
//   constructor(public payload: cartItem) { }
// }
// export class AddProductToCart {
//   readonly type = ProductDetailActionTypes.ADD_PRODUCT_TO_CART;

//   constructor(public payload: ProductDetail) {
//   }
// }
// export class RemoveProductFromCart {
//   readonly type = ProductDetailActionTypes.REMOVE_PRODUCT_FROM_CART;

//   constructor(public payload: ProductDetail) {
//   }
// }

// export class IncrementCartQuantity {
//   readonly type = ProductDetailActionTypes.INCREMENT_CART_ITEM_QUANTITY;

//   constructor(public payload: number) {
//   }
// }

// export class DecrementCartQuantity {
//   readonly type = ProductDetailActionTypes.DECREMENT_CART_ITEM_QUANTITY;

//   constructor(public payload: number) {
//   }
// }


// export type ProductDetailAction =
//   | LoadProductDetail
//   | LoadProductDetailSuccess
//   | CreateProductDetail
//   | CreateProductDetailSuccess
//   | AddProductToCart
//   | RemoveProductFromCart
//   | IncrementCartQuantity | DecrementCartQuantity;


import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum ProductActionTypes {
    LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS SUCCESS',
    LOAD_PRODUCTS_FAIL = 'LOAD_PRODUCTS FAIL',
    LOAD_PRODUCTS = 'LOAD_PRODUCTS',
    LOAD_PRODUCT = 'LOAD_PRODUCT',
    LOAD_PRODUCT_SUCCESS = 'LOAD_PRODUCT SUCCESS',
    LOAD_PRODUCT_FAIL = 'LOAD_PRODUCT FAIL',
}



export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS;
}

export class LoadProductsSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS;

    constructor(public payload: any[]) { }
}

export class LoadProductsFail implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL;

    constructor(public payload: string) { }
}

export class LoadProduct implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT;

    constructor(public payload: number) { }
}

export class LoadProductSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS;

    constructor(public payload: any) { }
}

export class LoadProductFail implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_FAIL;

    constructor(public payload: string) { }
}






export type Actions =
    | LoadProducts
    | LoadProductsSuccess
    | LoadProductsFail
    | LoadProduct
    | LoadProductSuccess
    | LoadProductFail
