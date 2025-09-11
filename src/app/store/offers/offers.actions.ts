import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../core/models/offers';

export const loadOffersData = createAction('[App Component] Load offers data]');
export const loadOffersDataSuccess = createAction(
  '[App Component] Load offers data successfully]',
  props<{ offers: OfferPreview[] }>(),
);
export const loadOffersDataFailure = createAction(
  '[App Component] Load offers data failure',
);
