import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';
import { LoginRequest } from '../../../core/models/login-request';

export const checkAuthStatus = createAction(
  '[App component] Check Auth Status]',
);
export const checkAuthStatusSuccess = createAction(
  '[App component] Check Auth Status Successfully',
  props<{ user: User }>(),
);
export const checkAuthStatusFailure = createAction(
  '[App component] Check Auth Status Failure',
);

export const login = createAction(
  '[Login component] Login]',
  props<{ credentials: LoginRequest }>(),
);
export const loginSuccess = createAction(
  '[Login component] Login Successfully]',
  props<{ user: User }>(),
);
export const loginFailure = createAction('[Login component] Login Failure');
