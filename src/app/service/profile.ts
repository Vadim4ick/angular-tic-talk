import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProfile } from '../types/profile.types';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  constructor(private http: HttpClient) {}

  baseApiUrl = 'https://icherniakov.ru/yt-course';

  getTestAccount() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }
}
