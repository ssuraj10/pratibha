import { ProductState } from '.';
import { ProductAction, ProductActionTypes } from './product.action';


const initialState: ProductState = {
    product: [],
    loading: false,
    loaded: false
};

export const productReducer: (state: ProductState, action: ProductAction) => ProductState = (
    state: ProductState = initialState,
    action: ProductAction
) => {
    switch (action.type) {
        case ProductActionTypes.LOAD_PRODUCT: {
            return { ...state, loading: true, loaded: false };
        }
        case ProductActionTypes.LOAD_PRODUCT_SUCCESS: {
            return { ...state, product: action.payload, loading: false, loaded: true };
        }
        default:
            return state;
    }
};
