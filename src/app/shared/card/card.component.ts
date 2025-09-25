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
import { ToggleFavoriteOfferDirective } from '../directives/toggle-favorite-offer.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import { selectAuthStatus } from '../../store/app/app.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FavoriteOffersService } from '../../core/services/favorite-offers.service';

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
  private favoriteOffersService: FavoriteOffersService = inject(
    FavoriteOffersService,
  );

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
    this.isFavoriteButtonDisabled.set(true);
    this.favoriteOffersService
      .toggleFavorite(this.authStatus(), this.offer)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isDisabled: boolean) =>
        this.isFavoriteButtonDisabled.set(isDisabled),
      );
  }

  protected readonly AppRoute = AppRoute;
  protected readonly Boolean = Boolean;
}
