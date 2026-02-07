import { IProfile } from '@/shared/types/profile.types';
import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '@/shared/helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-profile-header',
  imports: [ImgUrlPipe],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {
  profile = input<IProfile | null>();
}
