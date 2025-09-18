import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {FavoriteOffersState} from '../../core/models/favorite-offers.state';
import {createReducer, on} from '@ngrx/store';
import {
  loadFavoriteOffers,
  loadFavoriteOffersFailure,
  loadFavoriteOffersSuccess
} from './actions/favorite-offers.actions';

export const favoriteOffersAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();
const initialState: FavoriteOffersState = favoriteOffersAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  },
);

export const favoriteOffersReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, (state) => ({
    ...state,
  })),
  on(loadFavoriteOffersSuccess, (state, {favoriteOffers}) =>
    favoriteOffersAdapter.setAll(favoriteOffers, {...state})
  ),
  on(loadFavoriteOffersFailure, (state) => ({
    ...state,
  }))
);
