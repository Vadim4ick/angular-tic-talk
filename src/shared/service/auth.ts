import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenRes } from '../types/auth.types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  tokens: { access_token: string | null; refresh_token: string | null } = {
    access_token: null,
    refresh_token: null,
  };

  getToken() {
    return !!this.tokens.access_token;
  }

  baseApiUrl = 'https://icherniakov.ru/yt-course';

  login(payload: { telegram: string; password: string }) {
    const formData = new FormData();

    formData.append('username', payload.telegram);
    formData.append('password', payload.password);

    return this.http.post<TokenRes>(`${this.baseApiUrl}/auth/token`, formData).pipe(
      tap((val) => {
        this.tokens.access_token = val.access_token;
        this.tokens.refresh_token = val.refresh_token;
      }),
    );
  }
}
