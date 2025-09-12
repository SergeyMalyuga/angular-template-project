import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../core/models/offers';
import { OffersState } from '../../core/models/offers-state';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
  loadOffersData,
  loadOffersDataFailure,
  loadOffersDataSuccess,
} from './actions/offers.actions';

export const offersAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();
const initialState: OffersState = offersAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const offersReducer: ActionReducer<
  OffersState,
  Action<string>
> = createReducer(
  initialState,
  on(
    loadOffersData,
    (state: OffersState): OffersState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    loadOffersDataSuccess,
    (state: OffersState, { offers }): OffersState =>
      offersAdapter.setAll(offers, { ...state, isLoading: false }),
  ),
  on(
    loadOffersDataFailure,
    (state: OffersState): OffersState => ({
      ...state,
      isLoading: false,
    }),
  ),
);
