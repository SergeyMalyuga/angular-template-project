import { createReducer } from '@ngrx/store';
import { City } from '../../core/models/city';
import { DEFAULT_CITY } from '../../core/constants/const';

const initialState: City = DEFAULT_CITY;

export const cityReducer = createReducer(initialState);
