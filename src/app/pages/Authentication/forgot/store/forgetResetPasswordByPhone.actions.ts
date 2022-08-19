import { Action, createAction, props } from '@ngrx/store';
import {resetPasswordByPhone } from './resetPasswordByPhone.model';
import { forgotPasswordByPhone } from './forgotPasswordByPhone.model';
import { ApiMessage } from 'src/app/models/apimessage';




export const createForgetPhoneRequest = createAction(
  '[ForgetPasswordRecoveryByPhone Component] Add Phone Number to get Reset code',
  props<{ forgotPasswordByPhone: forgotPasswordByPhone }>()
);

export const createForgetPhoneRequestSuccess = createAction(
  '[Phone Forget Request Effect] Phone Number to get Reset code Success',
  props<{ forgotPasswordByPhone: any }>()
);

export const createForgetPhoneRequestFaliure = createAction(
  '[Phone Forget Request Effect] Phone Number to get Reset code Faliure',
  props<{ forgotPasswordByPhone: ApiMessage }>()
);
// export const createSinup = createAction(
//     '[Create sinup Component] Create Course',
//     props<{sinup: Signup}>()
//   );

 

  // export const ConfirmCreateSinup = createAction(
  //   '[Create sinup2 Component] Create Course',
  //   props<{confirmSignup: confirmSignup}>()
  // );

  // export const courseTwoActionTypes = {
  //   ConfirmCreateSinup,
  // };
  
  
  export const CreateResetPasswordByPhone = createAction(
    '[Forget component] Reset Password',
    props<{ resetPasswordByPhone: resetPasswordByPhone }>()
  );
  
  export const CreateResetPasswordByPhoneSuccess = createAction(
    '[Reset Password By Phone Effect] Reset Password By Phone Success',
    props<{ resetPasswordByPhone: any }>()
  );
  
  export const CreateResetPasswordByPhoneFailure = createAction(
    '[Reset Password By Phone Effect] Reset Password By Phone Failure',
    props<{ resetPasswordByPhone: ApiMessage }>()
  );