import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './Reducer/auth.reducers';
import { errorReducer, ErrorState } from './Reducer/error.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  error: errorReducer
};

export interface AppState {
  auth: AuthState;
  error: ErrorState;
}
