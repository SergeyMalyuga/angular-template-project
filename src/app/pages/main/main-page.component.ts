import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from '../../features/header/header.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { OfferPreview } from '../../core/models/offers';
import { City } from '../../core/models/city';
import { AuthorizationStatus, DEFAULT_CITY } from '../../core/constants/const';
import { combineLatest, map, Subject, takeUntil, tap } from 'rxjs';
import {
  selectAuthStatus,
  selectCity,
  selectOffers,
} from '../../store/app/app.selectors';
import { OfferListComponent } from '../../features/offer-list/offer-list.component';
import { CitiesListComponent } from '../../features/cities-list/cities-list.component';
import { OffersSortingOptionsComponent } from '../../features/offers-sorting-options/offers-sorting-options.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    OfferListComponent,
    CitiesListComponent,
    OffersSortingOptionsComponent,
  ],
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit, OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject = new Subject<void>();
  public offers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);
  public currentCity: WritableSignal<City> = signal<City>(DEFAULT_CITY);
  public activeCard: WritableSignal<OfferPreview | null> =
    signal<OfferPreview | null>(null);
  public authStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);

  public ngOnInit(): void {
    combineLatest([
      this.store.select(selectOffers),
      this.store.select(selectCity),
    ])
      .pipe(
        tap(([, city]: [OfferPreview[], City]): void =>
          this.currentCity.set(city),
        ),
        map(([offers, city]: [OfferPreview[], City]): OfferPreview[] =>
          offers.filter((offer) => offer.city.name === city.name),
        ),
        takeUntil(this.destroySubject),
      )
      .subscribe((offers) => this.offers.set(offers));
    this.store
      .select(selectAuthStatus)
      .subscribe((authStatus: AuthorizationStatus) =>
        this.authStatus.set(authStatus),
      );
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
