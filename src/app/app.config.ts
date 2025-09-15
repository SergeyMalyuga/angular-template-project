import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { OffersEffects } from './store/offers/effects/offers.effects';
import { AuthEffects } from './store/user/effects/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects(OffersEffects, AuthEffects),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
