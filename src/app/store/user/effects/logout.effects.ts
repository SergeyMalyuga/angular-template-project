import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as actions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class LogoutEffects {
  private actions$: Actions = inject(Actions);
  private userService: UserService = inject(UserService);

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logout),
      switchMap(() =>
        this.userService.deleteUser().pipe(
          map(() => actions.logoutSuccess()),
          catchError(() => of(actions.logoutFailure())),
        ),
      ),
    ),
  );
}
