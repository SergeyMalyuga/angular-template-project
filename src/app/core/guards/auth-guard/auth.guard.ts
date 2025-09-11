import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AppRoute} from '../../constants/const';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  private auth = false;
  private router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree {
        if(this.auth) {
          return true;
        } else {
          return this.router.createUrlTree([AppRoute.LOGIN], {
            queryParams: { redirectUrl: state.url },
          });
        }
    }
}
