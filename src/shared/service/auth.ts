import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  baseApiUrl = 'https://icherniakov.ru/yt-course';

  login(payload: { telegram: string; password: string }) {
    const formData = new FormData();

    formData.append('username', payload.telegram);
    formData.append('password', payload.password);

    return this.http.post(`${this.baseApiUrl}/auth/token`, formData);
  }
}
