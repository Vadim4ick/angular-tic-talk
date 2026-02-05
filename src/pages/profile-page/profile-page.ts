import { Component, inject } from '@angular/core';
import { ProfileHeader } from '@/components/profile-header/profile-header';
import { Profile } from '@/shared/service/profile';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  profileService = inject(Profile);

  profile = this.profileService.me;
}
