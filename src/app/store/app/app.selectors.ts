import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { City } from '../../core/models/city';
import { offersAdapter } from '../offers/offers.reducer';

const selectCityState = createFeatureSelector<AppState['city']>('city');
const selectOffersState = createFeatureSelector<AppState['offers']>('offers');
const offersSelectors = offersAdapter.getSelectors();

export const selectCity = createSelector(
  selectCityState,
  (state: City) => state,
);

export const selectOffers = createSelector(
  selectOffersState,
  offersSelectors.selectAll,
);
