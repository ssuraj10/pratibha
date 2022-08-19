import {  ErrorActions, errorActionread } from '../Action/error.action';


export interface ErrorState {
  error: any;
}

const initialState: ErrorState = {
  error: null
};

export const errorReducer: (state: ErrorState, action: errorActionread) => ErrorState = (
  state = initialState,
  action: errorActionread
) => {
  switch (action.type) {
    case ErrorActions.ADD_ERROR:
      return { ...state, error: action.payload };
    case ErrorActions.REMOVE_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
