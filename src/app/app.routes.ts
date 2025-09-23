import { Routes } from '@angular/router';
import { AppRoute } from './core/constants/const';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';

export const routes: Routes = [
  {
    path: AppRoute.MAIN,
    title: 'Main',
    loadComponent: () =>
      import('./pages/main/main-page.component').then(
        (m) => m.MainPageComponent,
      ),
  },
  {
    path: AppRoute.LOGIN,
    title: 'Login',
    loadComponent: () =>
      import('./pages/login/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: `${AppRoute.OFFER}/:id`,
    title: 'Offer',
    loadComponent: () =>
      import('./pages/offer/offer-page.component').then(
        (m) => m.OfferPageComponent,
      ),
  },
  {
    path: AppRoute.FAVORITES,
    title: 'Favorites',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/favorites/favorites-page.component').then(
        (m) => m.FavoritesPageComponent,
      ),
  },
  {
    path: '**',
    title: 'Not found 404',
    loadComponent: () =>
      import('./pages/not-found/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
