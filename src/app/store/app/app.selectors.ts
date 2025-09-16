import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { City } from '../../core/models/city';
import { offersAdapter } from '../offers/offers.reducer';
import { UserState } from '../../core/models/user-state';

const selectCityState = createFeatureSelector<AppState['city']>('city');
const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const selectUserState = createFeatureSelector<AppState['user']>('user');
const offersSelectors = offersAdapter.getSelectors();

export const selectCity = createSelector(
  selectCityState,
  (state: City) => state,
);

export const selectOffers = createSelector(
  selectOffersState,
  offersSelectors.selectAll,
);

export const selectAuthStatus = createSelector(
  selectUserState,
  (state: UserState) => state.authorizationStatus,
);
