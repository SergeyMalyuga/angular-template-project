import { Injectable } from '@angular/core';
import { OfferPreview } from '../models/offers';
import { sortType } from '../constants/const';

@Injectable()
export class OffersSortService {
  public sortOffers(offers: OfferPreview[], type: sortType): OfferPreview[] {
    return this.sortByType(offers, type);
  }

  private byPriceAsc(first: OfferPreview, second: OfferPreview): number {
    return first.price - second.price;
  }

  private byPriceDesc(first: OfferPreview, second: OfferPreview): number {
    return second.price - first.price;
  }

  private byRatingDesc(first: OfferPreview, second: OfferPreview): number {
    return second.rating - first.rating;
  }

  private sortByType(offers: OfferPreview[], type: sortType): OfferPreview[] {
    switch (type) {
      case sortType.POPULAR:
        return [...offers];
      case sortType.PRICE_LOW_TO_HIGH:
        return [...offers].sort(this.byPriceAsc);
      case sortType.PRICE_HIGH_TO_LOW:
        return [...offers].sort(this.byPriceDesc);
      case sortType.TOP_RATED_FIRST:
        return [...offers].sort(this.byRatingDesc);
    }
  }
}
