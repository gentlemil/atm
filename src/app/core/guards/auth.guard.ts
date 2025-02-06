import { PersistanceService } from './../services/persistance.service';
import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private persistanceService = inject(PersistanceService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const accessToken = this.persistanceService.get('accessToken');

    if ((state.url === '/' || state.url === '/login') && accessToken) {
      return this.router.createUrlTree(['/dashboard']);
    } else if (
      (state.url === '/dashboard' ||
        state.url === '/balance' ||
        state.url === '/withdraw') &&
      !accessToken
    ) {
      return this.router.createUrlTree(['/login']);
    }
    return true;
  }
}
