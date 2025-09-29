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
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { OfferPreview } from '../../core/models/offers';
import {
  selectAuthStatus,
  selectFavoriteOffers,
  selectUserEmail,
} from '../../store/app/app.selectors';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { AppLogoutClickDirective } from './directives/logout.directive';
import { logout } from '../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AppLogoutClickDirective],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly AppRoute = AppRoute;
  public favoriteOffers: WritableSignal<OfferPreview[]> = signal<
    OfferPreview[]
  >([]);
  public userEmail: WritableSignal<string | undefined> = signal<
    string | undefined
  >(undefined);
  public authStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject = new Subject<void>();
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectFavoriteOffers),
      this.store.select(selectUserEmail),
      this.store.select(selectAuthStatus),
    ])
      .pipe(takeUntil(this.destroySubject))
      .subscribe(([offers, userName, authStatus]) => {
        this.favoriteOffers.set(offers);
        this.userEmail.set(userName);
        this.authStatus.set(authStatus);
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public onLogout() {
    this.store.dispatch(logout());
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
