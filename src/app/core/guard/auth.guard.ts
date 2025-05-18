import { inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const r = inject(Router);
  return inject(AuthService).checkAuth().pipe(map(isAuthenticated => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      // navigation
      r.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }), catchError(error => {
    console.log(error);
    r.navigateByUrl('/login');
    return of(false);
  }));
};