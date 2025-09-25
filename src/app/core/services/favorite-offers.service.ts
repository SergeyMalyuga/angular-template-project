import { inject, Injectable } from '@angular/core';
import { AppRoute, AuthorizationStatus } from '../constants/const';
import { changeFavoriteOffer } from '../../store/favorite-offers/actions/favorite-offers.actions';
import { selectFavoriteOfferIsLoading } from '../../store/app/app.selectors';
import { filter, finalize, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app.state';
import { Offer, OfferPreview } from '../models/offers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOffersService {
  private store: Store<AppState> = inject(Store<AppState>);
  private router: Router = inject(Router);

  public toggleFavorite(
    authStatus: AuthorizationStatus,
    offer: Offer | OfferPreview | undefined,
  ) {
    if (authStatus === AuthorizationStatus.AUTH && offer) {
      this.store.dispatch(
        changeFavoriteOffer({
          offerId: offer.id,
          status: String(+!offer.isFavorite),
        }),
      );
      return this.store.select(selectFavoriteOfferIsLoading).pipe(
        filter((isLoading: boolean) => isLoading === false),
        take(1),
        finalize(() => of(false)),
      );
    } else {
      this.router.navigate([AppRoute.LOGIN]);
      return of(false);
    }
  }
}
