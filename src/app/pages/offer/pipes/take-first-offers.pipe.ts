import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';

@Pipe({
  name: 'takeFirst'
})
export class TakeFirstOffersPipe implements PipeTransform {
    transform(offers: OfferPreview[], count: number): OfferPreview[] {
        return offers.slice(0, count);
    }
}
