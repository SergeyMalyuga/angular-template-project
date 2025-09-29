import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {HeaderComponent} from '../../features/header/header.component';
import {OfferPreview} from '../../core/models/offers';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectFavoriteOffers} from '../../store/app/app.selectors';
import {FavoritesListComponent} from '../../features/favorites-list/favorites-list.component';

@Component({
  selector: 'app-favorites',
  imports: [HeaderComponent, FavoritesListComponent],
  templateUrl: './favorites-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit {
  public favoriteOffers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);

  private store: Store<AppState> = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.select(selectFavoriteOffers).subscribe((offers) => this.favoriteOffers.set(offers));
  }
}
