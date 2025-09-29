import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AppRoute, AuthorizationStatus } from '../../constants/const';
import { AppState } from '../../models/app.state';
import { Store } from '@ngrx/store';
import { selectAuthStatus } from '../../../store/app/app.selectors';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectAuthStatus).pipe(
      filter((status: AuthorizationStatus) => {
        return status !== AuthorizationStatus.UNKNOWN;
      }),
      take(1),
      map((status: AuthorizationStatus) => {
        if (status === AuthorizationStatus.AUTH) {
          return true;
        } else {
          return this.router.createUrlTree([AppRoute.LOGIN], {
            queryParams: { redirectUrl: state.url },
          });
        }
      }),
    );
  }
}
