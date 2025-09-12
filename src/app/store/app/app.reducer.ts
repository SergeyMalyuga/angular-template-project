import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { offersReducer } from '../offers/offers.reducer';
import { cityReducer } from '../city/city.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offers: offersReducer,
  city: cityReducer,
};
