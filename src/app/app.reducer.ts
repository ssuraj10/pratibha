import * as fromShop from './pages/shopping-cart/shopping-cart-item/store/shop.reducer'
import { ActionReducerMap } from '@ngrx/store';
import * as fromBrandFilter from './pages/filterstore/brand-filter/brand-filter.reducer';
import * as fromPriceFilter from './pages/filterstore/price-filter/price-filter.reducer';


export interface AppState {
    shop: fromShop.State;
    brandFilter: string;
    orderBy: string;
}

export const reducers: ActionReducerMap<AppState> = {
    shop: fromShop.shoppingListReducer,
    brandFilter: fromBrandFilter.brandFilterReducer,
    orderBy: fromPriceFilter.orderByPriceReducer
}