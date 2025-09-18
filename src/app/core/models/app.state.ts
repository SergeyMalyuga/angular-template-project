import { OffersState } from './offers.state';
import { FavoriteOffersState } from './offers-favorite-state';
import { UserState } from './user.state';
import { City } from './city';

export interface AppState {
  user: UserState;
  city: City;
  offers: OffersState;
  favoriteOffers: FavoriteOffersState;
}
