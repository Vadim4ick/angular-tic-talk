import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenRes } from '../types/auth.types';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  baseApiUrl = 'https://icherniakov.ru/yt-course';
  cookieService = inject(CookieService);

  tokens: { access_token: string | null; refresh_token: string | null } = {
    access_token: null,
    refresh_token: null,
  };

  getToken() {
    if (!this.tokens.access_token) {
      this.tokens.access_token = this.cookieService.get('access_token');
    }

    return !!this.tokens.access_token;
  }

  login(payload: { telegram: string; password: string }) {
    const formData = new FormData();

    formData.append('username', payload.telegram);
    formData.append('password', payload.password);

    return this.http.post<TokenRes>(`${this.baseApiUrl}/auth/token`, formData).pipe(
      tap((val) => {
        this.tokens.access_token = val.access_token;
        this.tokens.refresh_token = val.refresh_token;

        this.cookieService.set('access_token', val.access_token);
        this.cookieService.set('refresh_token', val.refresh_token);
      }),
    );
  }
}
