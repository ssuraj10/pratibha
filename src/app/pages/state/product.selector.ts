import { createSelector } from '@ngrx/store';

import { AppState, ProductState } from '.';

export const selectProductState = (state: AppState) => state.product;
export const selectproducts = createSelector(
    selectProductState,
  (state: ProductState) => state.product
);
