import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as SignupActions from './sinup.actions';
import { Signup } from './sinup.model';
import * as fromRoot from '../../../../app.reducer';



export interface SignupState extends EntityState<Signup> {
    Loaded: boolean;
}
export const signupsFeatureKey = 'signups';

export const adapter: EntityAdapter<Signup> = createEntityAdapter<Signup>();
export const initialState = adapter.getInitialState({
    Loaded: false
});

export const SinupReducer = createReducer(
    initialState,

    on(SignupActions.createSignup, (state, action) => {
        return adapter.addOne(action.signup, state);
    }),
)

export const { selectAll, selectIds } = adapter.getSelectors();