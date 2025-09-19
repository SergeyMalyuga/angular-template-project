import { createAction, props } from '@ngrx/store';
import { Offer, OfferPreview } from '../../../core/models/offers';

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

export const changeFavoriteOffer = createAction(
  '[Card component] add offer]',
  props<{ offerId: string; status: string }>(),
);
export const changeFavoriteOfferSuccess = createAction(
  '[Card component] add offer success',
  props<{ offers: OfferPreview[]; offer: Offer }>(),
);
export const ChangeFavoriteOfferFailure = createAction(
  '[Card component] add offers Failure',
);
