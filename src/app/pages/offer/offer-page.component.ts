import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
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

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, CapitalizePipe],
  templateUrl: './offer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPageComponent {
  public offerId: WritableSignal<string | null> = signal<string | null>(null);
  public offer: WritableSignal<Offer | undefined> = signal<Offer | undefined>(
    undefined,
  );
  public user: WritableSignal<User | null> = signal<User | null>(null);

  private offerService = inject(OffersService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.route.paramMap.subscribe((params) =>
      this.offerId.set(params.get('id')),
    );
    effect(() => {
      const id: string | null = this.offerId();
      if (id) {
        this.offerService
          .getOfferById(id)
          .subscribe((offer) => this.offer.set(offer));
      }
    });
  }

  protected readonly Math = Math;
}
