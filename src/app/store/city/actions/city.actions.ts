import { createAction, props } from '@ngrx/store';
import { City } from '../../../core/models/city';

export const changeCity = createAction(
  '[Cities list component] change city',
  props<{ city: City }>(),
);
