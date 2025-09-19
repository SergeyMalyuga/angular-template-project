import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { OfferPreview } from '../../core/models/offers';
import { selectFavoriteOffers } from '../../store/app/app.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly AppRoute = AppRoute;
  public favoriteOffers: WritableSignal<OfferPreview[]> = signal<
    OfferPreview[]
  >([]);
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject = new Subject<void>();

  ngOnInit(): void {
    this.store
      .select(selectFavoriteOffers)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((offers: OfferPreview[]): void => {
        this.favoriteOffers.set(offers);
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
