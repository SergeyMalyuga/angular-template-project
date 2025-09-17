import { inject, Pipe, PipeTransform } from '@angular/core';
import { OffersSortService } from '../../../core/services/offers-sort.service';
import { OfferPreview } from '../../../core/models/offers';
import { sortType } from '../../../core/constants/const';

@Pipe({
  name: 'appOffersSort',
})
export class OffersSortPipe implements PipeTransform {
  private sortService = inject(OffersSortService);

  transform(offers: OfferPreview[], type: sortType) {
    return this.sortService.sortOffers(offers, type);
  }
}
