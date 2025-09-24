import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from '../../features/header/header.component';
import { Offer } from '../../core/models/offers';
import { User } from '../../core/models/user';
import { OffersService } from '../../core/services/offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizePipe } from '../../shared/card/pipes/capitalize.pipe';
import { Comment } from '../../core/models/comments';
import { CommentService } from '../../core/services/comment.service';
import { Subject, takeUntil } from 'rxjs';
import {CommentComponent} from '../../features/comment/comment.component';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, CapitalizePipe, CommentComponent],
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
  public readonly Math = Math;

  private offerService = inject(OffersService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private commentService: CommentService = inject(CommentService);
  private destroySubject: Subject<void> = new Subject<void>();

  constructor() {
    this.route.paramMap.subscribe((params) =>
      this.offerId.set(params.get('id')),
    );
    effect(() => {
      const id: string | null = this.offerId();
      if (id) {
        this.offerService
          .getOfferById(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((offer) => this.offer.set(offer));
        this.commentService
          .getComments(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((comments: Comment[]) => this.comments.set(comments));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
