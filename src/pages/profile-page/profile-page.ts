import { Component, inject } from '@angular/core';
import { ProfileHeader } from '@/components/profile-header/profile-header';
import { Profile } from '@/shared/service/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { IconsModule } from '@/shared/lucide/lucide-module';
import { UbButtonDirective } from '@/shared/ui/button';
import { ImgUrlPipe } from '@/shared/helpers/pipes/img-url-pipe';
import { PostFeed } from '@/components/post-feed/post-feed';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeader,
    AsyncPipe,
    IconsModule,
    RouterLink,
    UbButtonDirective,
    ImgUrlPipe,
    PostFeed,
  ],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  profileService = inject(Profile);

  subscribers$ = this.profileService.getSubscribers(5);

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
