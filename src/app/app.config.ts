import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { OffersEffects } from './store/offers/effects/offers.effects';
import { AuthEffects } from './store/user/effects/auth.effects';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoginEffects } from './store/user/effects/login.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects(OffersEffects, AuthEffects, LoginEffects),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
