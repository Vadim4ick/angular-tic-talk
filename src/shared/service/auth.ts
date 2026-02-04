import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenRes } from '../types/auth.types';
import { catchError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  baseApiUrl = 'https://icherniakov.ru/yt-course';
  cookieService = inject(CookieService);
  router = inject(Router);

  tokens: { access_token: string | null; refresh_token: string | null } = {
    access_token: null,
    refresh_token: null,
  };

  getToken() {
    if (!this.tokens.access_token) {
      this.tokens.access_token = this.cookieService.get('access_token');
      this.tokens.refresh_token = this.cookieService.get('refresh_token');
    }

    return !!this.tokens.access_token;
  }

  login(payload: { telegram: string; password: string }) {
    const formData = new FormData();

    formData.append('username', payload.telegram);
    formData.append('password', payload.password);

    return this.http.post<TokenRes>(`${this.baseApiUrl}/auth/token`, formData).pipe(
      tap((val) => {
        this.saveTokens(val);
      }),
    );
  }

  refreshAuthToken() {
    return this.http
      .post<TokenRes>(`${this.baseApiUrl}/auth/refresh`, {
        refresh_token: this.tokens.refresh_token,
      })
      .pipe(
        tap((val) => {
          this.saveTokens(val);
        }),
        catchError((err) => {
          this.logout();
          throw Error(err);
        }),
      );
  }

  logout() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    this.tokens.access_token = null;
    this.tokens.refresh_token = null;
    this.router.navigate(['login']);
  }

  saveTokens(res: TokenRes) {
    this.tokens.access_token = res.access_token;
    this.tokens.refresh_token = res.refresh_token;

    this.cookieService.set('access_token', res.access_token);
    this.cookieService.set('refresh_token', res.refresh_token);
  }
}
