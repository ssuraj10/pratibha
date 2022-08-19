import { Action } from '@ngrx/store';
import { UserAddress } from './delivery-address.model';

export enum DeliveryAddressActionTypes {
  CREATE_DELIVERYADDRESS = 'CREATE_DELIVERYADDRESS',
  CREATE_DELIVERYADDRESS_SUCCESS = 'CREATE_DELIVERYADDRESS SUCCESS',
  CREATE_DELIVERYADDRESS_FAIL = 'CREATE_DELIVERYADDRESS FAIL',
}


export class CreateUserAddress implements Action {
  readonly type = DeliveryAddressActionTypes.CREATE_DELIVERYADDRESS;

  constructor(public payload: UserAddress) { }
}

export class CreateUserAddressSuccess implements Action {
  readonly type = DeliveryAddressActionTypes.CREATE_DELIVERYADDRESS_SUCCESS;

  constructor(public payload: UserAddress) { }
}

export class CreateUserAddressFail implements Action {
  readonly type = DeliveryAddressActionTypes.CREATE_DELIVERYADDRESS_FAIL;

  constructor(public payload: string) { }
}


export type Actions =
  | CreateUserAddress
  | CreateUserAddressSuccess
  | CreateUserAddressFail
