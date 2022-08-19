import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ChangePasswordActions from './changePassword.actions';

import * as fromRoot from '../../../../app.reducer';
import { changePassword } from './changePassword.model';



export interface ChangePasswordState extends EntityState<changePassword> {
    Loaded: boolean;
}
export const changePasswordFeatureKey = 'changePassword';

export const adapter: EntityAdapter<changePassword> = createEntityAdapter<changePassword>();
export const initialState = adapter.getInitialState({
    Loaded: false
});

export const changePasswordReducer = createReducer(
    initialState,

    on(ChangePasswordActions.createChangePassword, (state, action) => {
        return adapter.addOne(action.changePassword, state);
    }),
)

export const { selectAll, selectIds } = adapter.getSelectors();