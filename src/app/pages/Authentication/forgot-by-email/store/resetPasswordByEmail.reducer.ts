import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as CreateResetPasswordByEmailActions from './forgetResetPasswordByEmail.actions';
import * as CreateforgetPasswordByEmailActions from './forgetResetPasswordByEmail.actions';
import {resetPasswordByEmail } from './resetPasswordByEmail.model';
import * as fromRoot from '../../../../app.reducer';
import { forgotPasswordByEmail } from './forgotPasswordByEmail.model';



export interface resetPasswordState extends EntityState<resetPasswordByEmail> {
    Loaded: boolean;
}
export const resetPasswordByEmailFeatureKey = 'resetPasswordByEmail';

export const adapter: EntityAdapter<resetPasswordByEmail> = createEntityAdapter<resetPasswordByEmail>();
export const initialState = adapter.getInitialState({
    Loaded: false
});

export const ResetByEmailReducer = createReducer(
    initialState,

    on(CreateResetPasswordByEmailActions.CreateResetPasswordByEmail, (state, action) => {
        return adapter.addOne(action.resetPasswordByEmail, state);
    }),
)
//now for forget




// export interface forgetPasswordState extends EntityState<forgotPasswordByEmail> {
//     Loaded: boolean;
// }
// export const forgetPasswordByEmailFeatureKey = 'forgetPasswordByEmail';

// export const adapter: EntityAdapter<forgotPasswordByEmail> = createEntityAdapter<forgotPasswordByEmail>();
// export const initialState = adapter.getInitialState({
//     Loaded: false
// });

// export const SinupReducer = createReducer(
//     initialState,

//     on(CreateforgetPasswordByEmailActions.createForgetEmailRequest, (state, action) => {
//         return adapter.addOne(action.forgotPasswordByEmail, state);
//     }),
// )



export const { selectAll, selectIds } = adapter.getSelectors();