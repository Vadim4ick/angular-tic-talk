// import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Auth } from '../service/auth';
// import { BehaviorSubject, catchError, filter, switchMap, tap } from 'rxjs';

// let isRefreshing$ = new BehaviorSubject<boolean>(false);

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(Auth);
//   const token = inject(Auth).tokens.access_token;

//   if (!token) {
//     return next(req);
//   }

//   if (isRefreshing$.value) {
//     return refreshAndProceed(authService, req, next);
//   }

//   req = addToken(req, token);

//   return next(req).pipe(
//     catchError((err) => {
//       if (err.status === 403) {
//         return refreshAndProceed(authService, req, next);
//       }

//       throw Error(err);
//     }),
//   );
// };

// const refreshAndProceed = (authService: Auth, req: HttpRequest<unknown>, next: HttpHandlerFn) => {
//   if (!isRefreshing$.value) {
//     isRefreshing$.next(true);

//     return authService.refreshAuthToken().pipe(
//       switchMap((res) => {
//         return next(addToken(req, res.access_token)).pipe(tap(() => isRefreshing$.next(false)));
//       }),
//     );
//   }

//   if (req.url.includes('refresh')) {
//     return next(addToken(req, authService.tokens.access_token!));
//   }

//   return isRefreshing$.pipe(
//     filter((isRefreshing) => !isRefreshing),
//     switchMap((res) => next(addToken(req, authService.tokens.access_token!))),
//   );
// };

// const addToken = (req: HttpRequest<unknown>, token: string) => {
//   return req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../service/auth';
import { catchError, switchMap, throwError, shareReplay, finalize, map } from 'rxjs';

let refreshToken$: import('rxjs').Observable<string> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  // не перехватываем refresh запрос
  if (req.url.includes('refresh')) {
    return next(req);
  }

  const token = auth.tokens.access_token;
  if (token) {
    req = addToken(req, token);
  }

  return next(req).pipe(
    catchError((err: unknown) => {
      const httpErr = err as HttpErrorResponse;

      if (httpErr.status !== 403) {
        return throwError(() => err);
      }

      return getOrCreateRefresh$(auth).pipe(switchMap((newToken) => next(addToken(req, newToken))));
    }),
  );
};

function getOrCreateRefresh$(auth: Auth) {
  if (!refreshToken$) {
    refreshToken$ = auth.refreshAuthToken().pipe(
      map((res) => res.access_token),
      shareReplay({ bufferSize: 1, refCount: false }),
      finalize(() => {
        refreshToken$ = null;
      }),
    );
  }
  return refreshToken$;
}

function addToken(req: HttpRequest<unknown>, token: string) {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}
