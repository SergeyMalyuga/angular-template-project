import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {SortedFavoriteOffers} from '../../core/models/sorted-favorite-offers';
import {FavoriteItemComponent} from '../favorite-item/favorite-item.component';

@Component({
  selector: 'app-favorites-list',
  imports: [
    FavoriteItemComponent
  ],
  templateUrl: './favorite-list.component.html'
})
export class FavoritesListComponent implements OnChanges {
  @Input({required: true}) favoriteOffers!: OfferPreview[];
  public sortedOffers: SortedFavoriteOffers = this.getSortedOffers();
  public readonly Object = Object;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favoriteOffers'] && this.favoriteOffers) {
      this.sortedOffers = this.getSortedOffers();
      this.favoriteOffers.forEach((offer: OfferPreview) => {
          const city = offer.city.name;
          const key = city.replace(city.charAt(0), city.charAt(0).toLowerCase());
          if (this.isKeyOf(key) && this.sortedOffers) {
            this.sortedOffers[key].push(offer);
          }
      })
    }
  }

  public isKeyOf(arg: string): arg is keyof SortedFavoriteOffers {
      return arg in this.sortedOffers;
  }

  private getSortedOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: [],
    }
  }
}
