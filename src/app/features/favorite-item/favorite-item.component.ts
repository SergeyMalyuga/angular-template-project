import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CardComponent} from '../../shared/card/card.component';
import {CapitalizePipe} from '../../shared/card/pipes/capitalize.pipe';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  imports: [
    CardComponent,
    CapitalizePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteItemComponent {
  @Input({required: true}) offers!: OfferPreview[]
  @Input({required: true}) city!: string
}
