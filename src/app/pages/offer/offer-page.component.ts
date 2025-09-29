import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import {HeaderComponent} from '../../features/header/header.component';
import {Offer, OfferPreview} from '../../core/models/offers';
import {User} from '../../core/models/user';
import {OffersService} from '../../core/services/offers.service';
import {ActivatedRoute} from '@angular/router';
import {CapitalizePipe} from '../../shared/card/pipes/capitalize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentService} from '../../core/services/comment.service';
import {Subject, takeUntil} from 'rxjs';
import {CommentComponent} from '../../features/comment/comment.component';
import {AuthorizationStatus, QUANTITY_FIRST_OFFERS} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/app/app.selectors';
import {CommentFormComponent} from '../../features/comment-form/comment-form.component';
import {LoaderComponent} from '../../features/loader/loader.component';
import {FavoriteOffersService} from '../../core/services/favorite-offers.service';
import {CardComponent} from '../../shared/card/card.component';
import {TakeFirstOffersPipe} from './pipes/take-first-offers.pipe';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    CapitalizePipe,
    CommentComponent,
    CommentFormComponent,
    LoaderComponent,
    CardComponent,
    TakeFirstOffersPipe,
  ],
  templateUrl: './offer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPageComponent implements OnDestroy {
  public offerId: WritableSignal<string | null> = signal<string | null>(null);
  public offer: WritableSignal<Offer | undefined> = signal<Offer | undefined>(
    undefined,
  );
  public user: WritableSignal<User | null> = signal<User | null>(null);
  public comments: WritableSignal<Comment[] | null> = signal<Comment[] | null>(
    null,
  );
  public sortedComments = computed(() =>
    this.comments()?.sort(
      (a: Comment, b: Comment) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  );
  public authStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  public readonly Math = Math;
  public isFavoriteButtonDisabled: WritableSignal<boolean> =
    signal<boolean>(false);
  public nearbyOffers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);

  private offerService = inject(OffersService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private commentService: CommentService = inject(CommentService);
  private destroySubject: Subject<void> = new Subject<void>();
  private store: Store<AppState> = inject(Store<AppState>);
  private favoriteOffersService: FavoriteOffersService = inject(
    FavoriteOffersService,
  );

  constructor() {
    this.route.paramMap
      .pipe(takeUntil(this.destroySubject))
      .subscribe((params) => this.offerId.set(params.get('id')));
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((authStatus: AuthorizationStatus) =>
        this.authStatus.set(authStatus),
      );
    effect(() => {
      const id: string | null = this.offerId();
      if (id) {
        this.offerService
          .getOfferById(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((offer) => this.offer.set(offer));
        this.offerService.getNearbyOffers(id).pipe(takeUntil(this.destroySubject)).subscribe((offers) => this.nearbyOffers.set(offers));
        this.commentService
          .getComments(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((comments: Comment[]) => this.comments.set(comments));
      }
    });
  }

  handleFavoriteOfferToggled() {
    this.isFavoriteButtonDisabled.set(true);
    this.favoriteOffersService
      .toggleFavorite(this.authStatus(), this.offer())
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isDisabled: boolean) => {
        this.isFavoriteButtonDisabled.set(isDisabled);
        this.offer.update((offer) => {
          if (offer) {
            return {...offer, isFavorite: !offer.isFavorite};
          }
          return offer;
        });
      });
  }

  public onCommentAdded(comment: Comment): void {
    this.comments.update((comments) => {
      if (comments) {
        return [comment, ...comments];
      } else {
        return comments;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
  protected readonly QUANTITY_FIRST_OFFERS = QUANTITY_FIRST_OFFERS;
}
