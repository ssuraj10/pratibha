import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as signInActions from './login.actions';
import * as fromRoot from '../../../../app.reducer';

export const signInFeatureKey = 'signIn';

export interface SignInState extends EntityState<any> {
  // additional entities state properties
  error: any;
  selectedSignInId: number | null;
  selectedSignIn: any;

}

export interface AppState extends fromRoot.AppState {
  signIn: SignInState;
}

export const signInAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: SignInState = signInAdapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedSignInId: null,
  selectedSignIn: {}
});

export function signInReducer(
  state = initialState,
  action: signInActions.Actions
): SignInState {
  switch (action.type) {
    case signInActions.SignInActionTypes.CREATE_SIGNIN_SUCCESS: {
      return signInAdapter.addOne(action.payload, {
        ...state,
        selectedSignIn: action.payload
      });
    }
    case signInActions.SignInActionTypes.CREATE_SIGNIN_FAIL: {
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
const getSignInFeatureState = createFeatureSelector<SignInState>(
  'signIn'
);

export const getSignInId = createSelector(
  getSignInFeatureState,
  (state: SignInState) => state.selectedSignInId
);
export const getSignIn = createSelector(
  getSignInFeatureState,
  getSignInId,
  state => state.selectedSignIn
);
