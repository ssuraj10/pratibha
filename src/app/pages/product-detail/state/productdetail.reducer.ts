// import { ProductDetailState } from '.';
// import { ProductDetailAction, ProductDetailActionTypes } from './productdetail.action';
// import { createSelector } from '@ngrx/store';

// const initialState: ProductDetailState = {
//     productDetail: [],
//     cart: [],
//     loading: false,
//     loaded: false
// };

// export const productDetailReducer: (state: ProductDetailState, action: ProductDetailAction) => ProductDetailState = (
//     state: ProductDetailState = initialState,
//     action: ProductDetailAction
// ) => {
//     let updatedCart;
//     let updatedItemIndex;
//     switch (action.type) {
//         case ProductDetailActionTypes.LOAD_PRODUCTDETAIL: {
//             return { ...state, loading: true, loaded: false };
//         }
//         case ProductDetailActionTypes.LOAD_PRODUCTDETAIL_SUCCESS: {
//             return { ...state, productDetail: action.payload, loading: false, loaded: true, success: true };
//         }
//         case ProductDetailActionTypes.CREATE_PRODUCTDETAIL: {
//             return { ...state, loading: true, loaded: false };
//         }
//         case ProductDetailActionTypes.CREATE_PRODUCTDETAIL_SUCCESS: {
//             return {
//                 ...state,
//                 ideas: { ...state.productDetail, [action.payload.productId]: action.payload },
//                 selectedIdea: action.payload.productId,
//                 loading: false,
//                 loaded: true
//             };
//         }
//         case ProductDetailActionTypes.ADD_PRODUCT_TO_CART:
//             updatedCart = [...state.cart];
//             updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);

//             if (updatedItemIndex < 0) {
//                 updatedCart.push({ ...action.payload, quantity: 1 });
//             } else {
//                 const updatedItem = {
//                     ...updatedCart[updatedItemIndex]
//                 };

//                 updatedItem.quantity++;
//                 updatedCart[updatedItemIndex] = updatedItem;
//             }

//             return { ...state, cart: updatedCart };
//         case ProductDetailActionTypes.REMOVE_PRODUCT_FROM_CART:
//             updatedCart = [...state.cart];
//             updatedItemIndex = updatedCart.findIndex(
//                 item => item.id === action.payload
//             );

//             updatedCart.splice(updatedItemIndex, 1);

//             return { ...state, cart: updatedCart };
//         case ProductDetailActionTypes.INCREMENT_CART_ITEM_QUANTITY:
//             updatedCart = [...state.cart];
//             updatedItemIndex = updatedCart.findIndex(
//                 item => item.id === action.payload
//             );

//             if (updatedCart[updatedItemIndex].quantity > 15) {
//                 return state;
//             }

//             const incrementedItem = {
//                 ...updatedCart[updatedItemIndex]
//             };

//             incrementedItem.quantity++;

//             updatedCart[updatedItemIndex] = incrementedItem;


//             return { ...state, cart: updatedCart };
//         case ProductDetailActionTypes.DECREMENT_CART_ITEM_QUANTITY:
//             updatedCart = [...state.cart];
//             updatedItemIndex = updatedCart.findIndex(
//                 item => item.id === action.payload
//             );

//             if (updatedCart[updatedItemIndex].quantity < 2) {
//                 return state;
//             }


//             const decrementedItem = {
//                 ...updatedCart[updatedItemIndex]
//             };

//             decrementedItem.quantity--;

//             updatedCart[updatedItemIndex] = decrementedItem;

//             return { ...state, cart: updatedCart };
//         default:
//             return state;
//     }
// };


import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as productActions from './productdetail.action';
import * as fromRoot from '../../../app.reducer';

export const productFeatureKey = 'products';

export interface ProductState extends EntityState<any> {
  // additional entities state properties
  error: any;
  selectedProductId: number | null;
  selectedProduct: any;

}

export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export const productAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: ProductState = productAdapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedProductId: null,
  selectedProduct: {}
});

export function productDetailReducer(
  state = initialState,
  action: productActions.Actions
): ProductState {
  switch (action.type) {
    case productActions.ProductActionTypes.LOAD_PRODUCTS_SUCCESS: {
      return productAdapter.setAll(action.payload, {
        ...state,
      });
    }
    case productActions.ProductActionTypes.LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        entities: {},
        error: action.payload
      };
    }
    case productActions.ProductActionTypes.LOAD_PRODUCT_SUCCESS: {
      return productAdapter.addOne(action.payload, {
        ...state,
        selectedProductId: action.payload.id,
        selectedProduct: action.payload
      });
    }
    case productActions.ProductActionTypes.LOAD_PRODUCT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
  
    default: {
      return state;
    }

  }
}
const getProductFeatureState = createFeatureSelector<ProductState>(
  'products'
);

export const getProducts = createSelector(
  getProductFeatureState,
  productAdapter.getSelectors().selectAll
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.selectedProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  state => state.selectedProduct
);
