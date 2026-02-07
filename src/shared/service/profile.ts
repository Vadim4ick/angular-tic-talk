import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProfile } from '@/shared/types/profile.types';
import { Pageble } from '../types/pageble.types';
import { map, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  private http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course';

  me = signal<IProfile | null>(null);

  private subscribersAll$ = this.http
    .get<Pageble<IProfile>>(`${this.baseApiUrl}/account/subscribers/`)
    .pipe(
      map((res) => res.items),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

  getSubscribers(total = 3) {
    return this.subscribersAll$.pipe(map((items) => items.slice(0, total)));
  }

  getTestAccount() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}/account/test_accounts`);
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

  uploadAvatar(image: FormData) {
    return this.http
      .post<IProfile>(`${this.baseApiUrl}/account/upload_image`, image)
      .pipe(tap((updated) => this.me.set(updated)));
  }
}
