import { ImgUrlPipe } from '@/shared/helpers/pipes/img-url-pipe';
import { IProfile } from '@/shared/types/profile.types';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  standalone: true,
  templateUrl: './profile-card.html',
})
export class ProfileCard {
  @Input() profile!: IProfile;
}
