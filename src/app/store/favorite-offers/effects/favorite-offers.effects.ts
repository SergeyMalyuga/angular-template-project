import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOffersService } from '../../../core/services/favorite-offers.service';
import * as actions from '../actions/favorite-offers.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class FavoriteOffersEffects {
  private actions$ = inject(Actions);
  private favoriteOffersService: FavoriteOffersService = inject(
    FavoriteOffersService,
  );

  public loadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadFavoriteOffers),
      switchMap(() =>
        this.favoriteOffersService.getFavoriteOffers().pipe(
          map((offers) =>
            actions.loadFavoriteOffersSuccess({ favoriteOffers: offers }),
          ),
          catchError(() => of(actions.loadFavoriteOffersFailure())),
        ),
      ),
    ),
  );
}
