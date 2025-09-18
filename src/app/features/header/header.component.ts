import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectFavoriteOffers} from '../../store/app/app.selectors';
import {filter} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit {
  public readonly AppRoute = AppRoute;
  public favoriteOffers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);
  private store: Store<AppState> = inject(Store<AppState>)

  ngOnInit(): void {
    this.store.select(selectFavoriteOffers).subscribe((offers) => {
      this.favoriteOffers.set(offers);
    }
    )
  }
}
