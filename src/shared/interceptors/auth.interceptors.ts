import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../service/auth';
import { catchError, switchMap } from 'rxjs';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = inject(Auth).tokens.access_token;

  if (!token) {
    return next(req);
  }

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next);
  }

  req = addToken(req, token);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      throw Error(err);
    }),
  );
};

const refreshAndProceed = (authService: Auth, req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true;
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        isRefreshing = false;
        return next(addToken(req, res.access_token));
      }),
    );
  }

  return next(addToken(req, authService.tokens.access_token!));
};

const addToken = (req: HttpRequest<unknown>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
