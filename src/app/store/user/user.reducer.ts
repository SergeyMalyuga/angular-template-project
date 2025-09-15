import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../core/models/user-state';
import { AuthorizationStatus, DEFAULT_USER } from '../../core/constants/const';
import {
  checkAuthStatus,
  checkAuthStatusFailure,
  checkAuthStatusSuccess,
} from './actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER,
};

export const userReducer = createReducer(
  initialState,
  on(checkAuthStatus, (state) => ({
    ...state,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(checkAuthStatusSuccess, (state, { user }) => ({
    ...state,
    user,
    authorizationStatus: AuthorizationStatus.AUTH,
  })),
  on(checkAuthStatusFailure, (state) => ({
    ...state,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
);
