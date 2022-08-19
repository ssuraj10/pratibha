import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserAddress } from './delivery-address.model';
import * as deliveryAddressAction from './delivery-address.actions';
import * as fromRoot from '../../../app.reducer';

export const deliveryAddressFeatureKey = 'deliveryAddress';

export interface DeliveryAddressState extends EntityState<UserAddress> {
  // additional entities state properties
  error: any;
  selectedDeliveryAddressId: number | null;
  selectedDelivery: any;

}

export interface AppState extends fromRoot.AppState {
  deliveryaddress: DeliveryAddressState;
}

export const DeliveryAddressAdapter: EntityAdapter<UserAddress> = createEntityAdapter<UserAddress>();

export const initialState: DeliveryAddressState = DeliveryAddressAdapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedDeliveryAddressId: null,
  selectedDelivery: {}
});

export function deliveryAddressReducer(
  state = initialState,
  action: deliveryAddressAction.Actions
): DeliveryAddressState {
  switch (action.type) {
    case deliveryAddressAction.DeliveryAddressActionTypes.CREATE_DELIVERYADDRESS_SUCCESS: {
      return DeliveryAddressAdapter.addOne(action.payload, state);
    }
    case deliveryAddressAction.DeliveryAddressActionTypes.CREATE_DELIVERYADDRESS_FAIL: {
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
const getDeliveryAddressFeatureState = createFeatureSelector<DeliveryAddressState>(
  'deliveryAddress'
);

export const getDeliveryAddress = createSelector(
  getDeliveryAddressFeatureState,
  DeliveryAddressAdapter.getSelectors().selectAll
);
export const getCurrentDeliveryAddressId = createSelector(
  getDeliveryAddressFeatureState,
  (state: DeliveryAddressState) => state.selectedDeliveryAddressId
);
export const getCurrentDeliveryAddress = createSelector(
  getDeliveryAddressFeatureState,
  getCurrentDeliveryAddressId,
  state => state.selectedDelivery
);
