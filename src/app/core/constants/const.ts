import { City } from '../models/city';
import {OfferPreview} from '../models/offers';

export enum AppRoute {
  MAIN = '',
  LOGIN = 'login',
  OFFER = 'offer',
  FAVORITES = 'favorites',
}

export enum APIRoute {
  LOGIN = 'login',
  LOGOUT = 'logout',
  COMMENTS = 'comments',
  FAVORITE = 'favorite',
  OFFERS = 'offers',
}

export enum AuthorizationStatus {
  AUTH = 'authenticated',
  UN_AUTH = 'unauthorized',
  UNKNOWN = 'unknown',
}

export const CITY_LOCATIONS: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 10,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 10,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5753,
      longitude: 10.0153,
      zoom: 10,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2217,
      longitude: 6.77616,
      zoom: 10,
    },
  },
];

export const DEFAULT_CITY: City = {
  name: 'Paris',
  location: {
    latitude: 48.8534,
    longitude: 2.3488,
    zoom: 10,
  },
};

export enum sortType {
  POPULAR = 'Popular',
  PRICE_LOW_TO_HIGH = 'Price: low to high',
  PRICE_HIGH_TO_LOW = 'Price: high to low',
  TOP_RATED_FIRST = 'Top rated first',
}

export const sortTypeKeys = {
  [sortType.POPULAR]: 'POPULAR',
  [sortType.PRICE_LOW_TO_HIGH]: 'PRICE_LOW_TO_HIGH',
  [sortType.PRICE_HIGH_TO_LOW]: 'PRICE_HIGH_TO_LOW',
  [sortType.TOP_RATED_FIRST]: 'TOP_RATED_FIRST',
};

export const QUANTITY_FIRST_OFFERS = 3;

export const DEFAULT_USER = undefined;

export const AUTH_TOKEN_KEY_NAME = 'auth-token';

export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
