import { OffersState } from './offers-state';
import { FavoriteOffersState } from './offers-favorite-state';
import { UserState } from './user-state';
import { CityState } from './city-state';
import { City } from './city';

export interface AppState {
  /*  user: UserState;
  currentCity: CityState;
  favoriteOffers: FavoriteOffersState;*/
  user: UserState;
  city: City;
  offers: OffersState;
}
