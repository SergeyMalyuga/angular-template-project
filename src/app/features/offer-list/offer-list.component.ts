import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offer-list.component.html',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferListComponent {
  @Input({ required: true }) offers!: OfferPreview[];
}
