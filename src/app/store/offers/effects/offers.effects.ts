import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OffersService } from '../../../core/services/offers.service';
import * as actions from '../actions/offers.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class OffersEffects {
  private actions$ = inject(Actions);
  private offersService = inject(OffersService);

  public offers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadOffersData),
      switchMap(() =>
        this.offersService.getOffers().pipe(
          map((offers) => actions.loadOffersDataSuccess({ offers })),
          catchError(() => of(actions.loadOffersDataFailure())),
        ),
      ),
    ),
  );
}
