import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as actions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private userService: UserService = inject(UserService);

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkAuthStatus),
      switchMap(() =>
        this.userService.getUser().pipe(
          map((user) => actions.checkAuthStatusSuccess({ user })),
          catchError(() => of(actions.checkAuthStatusFailure())),
        ),
      ),
    ),
  );
}
