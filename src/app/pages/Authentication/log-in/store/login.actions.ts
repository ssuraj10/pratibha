import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum SignInActionTypes {
  CREATE_SIGNIN = 'CREATE_SIGNIN',
  CREATE_SIGNIN_SUCCESS = 'CREATE_SIGNIN SUCCESS',
  CREATE_SIGNIN_FAIL = 'CREATE_SIGNIN FAIL',
}

export class CreateSignIn implements Action {
  readonly type = SignInActionTypes.CREATE_SIGNIN;

  constructor(public payload: any) { }
}

export class CreateSignInSuccess implements Action {
  readonly type = SignInActionTypes.CREATE_SIGNIN_SUCCESS;

  constructor(public payload: any) { }
}

export class CreateSignInFail implements Action {
  readonly type = SignInActionTypes.CREATE_SIGNIN_FAIL;

  constructor(public payload: string) { }
}

export type Actions =
  | CreateSignIn
  | CreateSignInSuccess
  | CreateSignInFail;
