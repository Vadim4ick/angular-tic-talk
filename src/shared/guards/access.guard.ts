import { inject } from '@angular/core';
import { Auth } from '../service/auth';
import { Router } from '@angular/router';

export const canActivateAuth = () => {
  const isLoggedIn = inject(Auth).getToken();

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
