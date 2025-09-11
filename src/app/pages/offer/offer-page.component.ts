import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../features/header/header.component';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent],
  templateUrl: './offer-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferPageComponent {}
