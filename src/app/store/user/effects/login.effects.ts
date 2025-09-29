import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as actions from '../actions/user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../../../core/models/user';
import { LoginRequest } from '../../../core/models/login-request';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      switchMap(({ credentials }: { credentials: LoginRequest }) =>
        this.userService.postUser(credentials).pipe(
          map((user: User) => {
            this.authService.setToken(user.token);
            return actions.loginSuccess({ user });
          }),
          catchError(() => of(actions.loginFailure())),
        ),
      ),
    ),
  );
}
