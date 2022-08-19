import * as ShopActions from './shop.action';
import { ProductDetail } from 'src/app/models/ProductDetail';
import { ShopActionTypes } from './shop.action';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as Store from 'src/app/Store';


export interface State {
  products: Array<ProductDetail>;
  cart: Array<ProductDetail>;
}

export interface CartState extends Store.AppState {
  cart: State;
}


const initialState: State = {
  products: [],
  cart: []
};

export function shoppingListReducer(state = initialState, action: ShopActions.ShopActions) {
  let updatedCart;
  let updatedItemIndex;

  switch (action.type) {
    case ShopActionTypes.ADD_PRODUCT_TO_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);

      if (updatedItemIndex < 0) {
        updatedCart.push({ productDetail: action.payload, quantity: 1 });
      } else {
        const updatedItem = {
          ...updatedCart[updatedItemIndex]
        };

        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
      }

      return { ...state, cart: updatedCart };
    case ShopActionTypes.REMOVE_PRODUCT_FROM_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item.id === action.payload
      );

      updatedCart.splice(updatedItemIndex, 1);

      return { ...state, cart: updatedCart };
    default:
      return state;

    case ShopActionTypes.INCREMENT_CART_ITEM_QUANTITY:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item.id === action.payload
      );

      if (updatedCart[updatedItemIndex].quantity > 14) {
        return state;
      }

      const incrementedItem = {
        ...updatedCart[updatedItemIndex]
      };

      incrementedItem.quantity++;

      updatedCart[updatedItemIndex] = incrementedItem;


      return { ...state, cart: updatedCart };

    case ShopActionTypes.DECREMENT_CART_ITEM_QUANTITY:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item.id === action.payload
      );

      if (updatedCart[updatedItemIndex].quantity < 2) {
        return state;
      }


      const decrementedItem = {
        ...updatedCart[updatedItemIndex]
      };

      decrementedItem.quantity--;

      updatedCart[updatedItemIndex] = decrementedItem;

      return { ...state, cart: updatedCart };


  }

}

export const selectCartState = (state: CartState) => state.cart;
// export const selectCartDetail = createSelector(
//   selectCartState,
//   (state: State) => state
// );

const getCartFeatureState = createFeatureSelector<State>(
  'shop'
);

export const selectCartDetail = createSelector(
  getCartFeatureState,
  (state: State) => state.cart
);
