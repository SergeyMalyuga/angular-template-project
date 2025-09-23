import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { ToggleFavoriteOfferDirective } from './directives/toggle-favorite-offer.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { changeFavoriteOffer } from '../../store/favorite-offers/actions/favorite-offers.actions';
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import {
  selectAuthStatus,
  selectFavoriteOfferIsLoading,
} from '../../store/app/app.selectors';
import { filter, finalize, Subject, take, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToggleFavoriteOfferDirective, RouterLink, CapitalizePipe],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) offer!: OfferPreview;
  public isFavorite = false;
  public readonly Math = Math;
  public isFavoriteButtonDisabled: WritableSignal<boolean> =
    signal<boolean>(false);
  private store: Store<AppState> = inject(Store<AppState>);
  private authStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  private destroySubject = new Subject<void>();
  private router = inject(Router);

  ngOnInit(): void {
    this.isFavorite = this.offer?.isFavorite ?? false;
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((status: AuthorizationStatus) => this.authStatus.set(status));
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  handleFavoriteOfferToggled() {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.isFavoriteButtonDisabled.set(true);
      this.store.dispatch(
        changeFavoriteOffer({
          offerId: this.offer.id,
          status: String(+!this.offer.isFavorite),
        }),
      );
      this.store
        .select(selectFavoriteOfferIsLoading)
        .pipe(
          filter((isLoading: boolean) => isLoading === false),
          take(1),
          finalize(() => this.isFavoriteButtonDisabled.set(false)),
        )
        .subscribe();
    } else {
      this.router.navigate([AppRoute.LOGIN]);
    }
  }

  protected readonly AppRoute = AppRoute;
}
