import { Action, createAction, props } from '@ngrx/store';
import { Signup } from './sinup.model';
import { confirmSignup } from './confirmSignup.model';
import { ApiMessage } from 'src/app/models/apimessage';




export const createSignup = createAction(
  '[AddPhoneSignup Component] Add Phone Signup',
  props<{ signup: Signup }>()
);
export const courseActionTypes = {
  createSignup,
};



export const createSignupSuccess = createAction(
  '[Phone Signup Effect] Add Phone Signup Success',
  props<{ signup: any }>()
);

export const createSignupFailure = createAction(
  '[Phone Signup Effect] Add Phone Signup Failure',
  props<{ signup: ApiMessage }>()
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
  export const loadSignups = createAction(
    '[Signup/API] Load Signups',
    props<{ signups: confirmSignup[] }>()
  );
  
  export const addSignup = createAction(
    '[Signup Component] Add Signup',
    props<{ signup: confirmSignup }>()
  );
  
  export const addSignupSuccess = createAction(
    '[Signup Effect] Add Signup Success',
    props<{ signup: any }>()
  );
  
  export const addSignupFailure = createAction(
    '[Signup Effect] Add Signup Failure',
    props<{ signup: ApiMessage }>()
  );