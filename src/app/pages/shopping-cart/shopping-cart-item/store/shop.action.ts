import { CartItem } from 'src/app/models/CartItem';
import { ProductDetail } from 'src/app/models/ProductDetail';

export enum ShopActionTypes {
    ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
    REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',
    INCREMENT_CART_ITEM_QUANTITY = 'INCREMENT_CART_ITEM_QUANTITY',
    DECREMENT_CART_ITEM_QUANTITY = 'DECREMENT_CART_ITEM_QUANTITY'
}



export class AddProductToCart {
    readonly type = ShopActionTypes.ADD_PRODUCT_TO_CART;

    constructor(public payload: ProductDetail) {
    }
}

export class RemoveProductFromCart {
    readonly type = ShopActionTypes.REMOVE_PRODUCT_FROM_CART;

    constructor(public payload: number) {
    }
}

export class IncrementCartQuantity {
    readonly type = ShopActionTypes.INCREMENT_CART_ITEM_QUANTITY;

    constructor(public payload: number) {
    }
}

export class DecrementCartQuantity {
    readonly type = ShopActionTypes.DECREMENT_CART_ITEM_QUANTITY;

    constructor(public payload: number) {
    }
}
export type ShopActions = AddProductToCart | RemoveProductFromCart | IncrementCartQuantity | DecrementCartQuantity;