import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';

export const loadFavoriteOffers = createAction(
  '[App component] load favorite offers',
);
export const loadFavoriteOffersSuccess = createAction(
  '[App component] load favorite offers Success',
  props<{ favoriteOffers: OfferPreview[] }>(),
);
export const loadFavoriteOffersFailure = createAction(
  '[App component] load favorite offers Failure',
);
