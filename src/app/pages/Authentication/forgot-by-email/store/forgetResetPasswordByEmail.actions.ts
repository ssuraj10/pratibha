import { Action, createAction, props } from '@ngrx/store';
import {resetPasswordByEmail } from './resetPasswordByEmail.model';
import { forgotPasswordByEmail } from './forgotPasswordByEmail.model';
import { ApiMessage } from 'src/app/models/apimessage';




export const createForgetEmailRequest = createAction(
  '[ForgetPasswordRecoveryByEmail Component] Add Email Number to get Reset code',
  props<{ forgotPasswordByEmail: forgotPasswordByEmail }>()
);

export const createForgetEmailRequestSuccess = createAction(
  '[Email Forget Request Effect] Email Number to get Reset code Success',
  props<{ forgotPasswordByEmail: any }>()
);

export const createForgetEmailRequestFaliure = createAction(
  '[Email Forget Request Effect] Email Number to get Reset code Faliure',
  props<{ forgotPasswordByEmail: ApiMessage }>()
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
  
  
  export const CreateResetPasswordByEmail = createAction(
    '[Forget component] Reset Password',
    props<{ resetPasswordByEmail: resetPasswordByEmail }>()
  );
  
  export const CreateResetPasswordByEmailSuccess = createAction(
    '[Reset Password By Email Effect] Reset Password By Email Success',
    props<{ resetPasswordByEmail: any }>()
  );
  
  export const CreateResetPasswordByEmailFailure = createAction(
    '[Reset Password By Email Effect] Reset Password By Email Failure',
    props<{ resetPasswordByEmail: ApiMessage }>()
  );