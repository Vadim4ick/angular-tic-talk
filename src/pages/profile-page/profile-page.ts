import { Component, inject } from '@angular/core';
import { ProfileHeader } from '@/components/profile-header/profile-header';
import { Profile } from '@/shared/service/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { IconsModule } from '@/shared/lucide/lucide-module';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeader, AsyncPipe, IconsModule, RouterLink],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  profileService = inject(Profile);

  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }

      return this.profileService.getAccount(Number(id));
    }),
  );
}
