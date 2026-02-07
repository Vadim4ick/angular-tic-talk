import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProfile } from '@/shared/types/profile.types';
import { Pageble } from '../types/pageble.types';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  constructor(private http: HttpClient) {}

  baseApiUrl = 'https://icherniakov.ru/yt-course';

  me = signal<IProfile | null>(null);

  getTestAccount() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  getSubscribers(total = 3) {
    return this.http
      .get<Pageble<IProfile>>(`${this.baseApiUrl}/account/subscribers/`)
      .pipe(map((val) => val.items.slice(0, total)));
  }

  getAccount(id: number) {
    return this.http.get<IProfile>(`${this.baseApiUrl}/account/${id}`);
  }

  getMe() {
    return this.http.get<IProfile>(`${this.baseApiUrl}/account/me`).pipe(
      tap((val) => {
        this.me.set(val);
      }),
    );
  }

  patchProfile(payload: Partial<IProfile>) {
    return this.http
      .patch<IProfile>(`${this.baseApiUrl}/account/me`, payload)
      .pipe(tap((updated) => this.me.set(updated)));
  }
}
