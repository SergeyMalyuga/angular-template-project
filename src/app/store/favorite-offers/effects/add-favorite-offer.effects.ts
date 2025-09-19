import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOffersService } from '../../../core/services/favorite-offers.service';
import * as actions from '../actions/favorite-offers.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AddFavoriteOfferEffects {
  public actions$: Actions = inject(Actions);
  public favoriteOfferService: FavoriteOffersService = inject(
    FavoriteOffersService,
  );

  public addFavoriteOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeFavoriteOffer),
      switchMap(({ offerId, status }) =>
        this.favoriteOfferService.addFavoriteOffer(offerId, status).pipe(
          switchMap((offer) =>
            this.favoriteOfferService.getFavoriteOffers().pipe(
              map((offers) =>
                actions.changeFavoriteOfferSuccess({ offers, offer }),
              ),
              catchError(() => of(actions.ChangeFavoriteOfferFailure())),
            ),
          ),
        ),
      ),
    ),
  );
}
