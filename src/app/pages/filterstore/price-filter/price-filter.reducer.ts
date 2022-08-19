import * as PriceFilterActions from './price-filter.actions';
import {PriceFilterTypes} from './price-filter.actions';

export const orderByPriceReducer = (state = '', action: PriceFilterActions.PriceFilterActions) => {
  switch (action.type) {
    case PriceFilterTypes.ORDER_BY_ASC:
      return 'asc';
    case PriceFilterTypes.ORDER_BY_DESC:
      return 'desc';
    case PriceFilterTypes.CLEAR_ORDER_BY_PRICE:
      return '';
    default:
      return state;
  }
};
