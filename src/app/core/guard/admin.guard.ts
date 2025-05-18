import { inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { catchError, map, of} from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { Role, User } from '../models/user';

export const AdminGuard: CanActivateFn = (route, state) => {
  const r = inject(Router);
  const user_id = localStorage.getItem('user_id');
  const main_url = state.url.split('/')[1];
  console.log(main_url);
  if(user_id) {
    return inject(UserService).getUserWithId(user_id).pipe(map(user => {
      const USER = user as User;
      if(USER.role === Role.Admin) {
         if(main_url !== 'admin') r.navigateByUrl('/admin');
        return true;
      } 
      else {
        if(main_url !== 'car-rental-platform') r.navigateByUrl('/car-rental-platform');
        return true;
      }
    }), catchError(error => {
        console.log(error);
        if(main_url !== 'car-rental-platform') r.navigateByUrl('/car-rental-platform');
        return of(true);
      }));
  }
  console.log(['login', 'sign-up'].includes(main_url));
  if(!['login', 'sign-up'].includes(main_url)) r.navigateByUrl('/login');
  return true;
  
};
