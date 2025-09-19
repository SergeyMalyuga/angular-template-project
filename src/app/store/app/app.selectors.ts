import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { City } from '../../core/models/city';
import { offersAdapter } from '../offers/offers.reducer';
import { UserState } from '../../core/models/user.state';
import { favoriteOffersAdapter } from '../favorite-offers/favorite-offers.reducer';
import { FavoriteOffersState } from '../../core/models/favorite-offers.state';

const selectCityState = createFeatureSelector<AppState['city']>('city');
const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const selectFavoriteOffersSate =
  createFeatureSelector<AppState['favoriteOffers']>('favoriteOffers');
const selectUserState = createFeatureSelector<AppState['user']>('user');

const offersSelectors = offersAdapter.getSelectors();
const favoriteOffersSelectors = favoriteOffersAdapter.getSelectors();

export const selectCity = createSelector(
  selectCityState,
  (state: City) => state,
);

export const selectOffers = createSelector(
  selectOffersState,
  offersSelectors.selectAll,
);

export const selectFavoriteOffers = createSelector(
  selectFavoriteOffersSate,
  favoriteOffersSelectors.selectAll,
);

export const selectFavoriteOfferIsLoading = createSelector(
  selectFavoriteOffersSate,
  (state: FavoriteOffersState) => state.isLoading,
);

export const selectAuthStatus = createSelector(
  selectUserState,
  (state: UserState) => state.authorizationStatus,
);
