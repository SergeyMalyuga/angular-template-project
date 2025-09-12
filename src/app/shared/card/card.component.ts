import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input({ required: true }) offer!: OfferPreview;
  public isFavorite = false;

  ngOnInit(): void {
    this.isFavorite = this.offer?.isFavorite ?? false;
  }

  protected readonly Math = Math;
}
