import { createReducer, on } from '@ngrx/store';
import { City } from '../../core/models/city';
import { DEFAULT_CITY } from '../../core/constants/const';
import { changeCity } from './actions/city.actions';

const initialState: City = DEFAULT_CITY;

export const cityReducer = createReducer(
  initialState,
  on(changeCity, (state, { city }) => ({
    ...state,
    ...city,
  })),
);
