import { Action, createAction, props } from '@ngrx/store';

import { ApiMessage } from 'src/app/models/apimessage';
import { changePassword } from './changePassword.model';



export const createChangePassword = createAction(
  '[changePassword Component] change password req ',
  props<{ changePassword: changePassword }>()
);

export const createChangePasswordSuccess = createAction(
  '[changePassword Effect] changePassword Success',
  props<{ changePassword: any }>()
);

export const createChangePasswordFailure = createAction(
  '[changePassword Effect] changePassword Failure',
  props<{ changePassword: ApiMessage }>()
);

 
  
 

