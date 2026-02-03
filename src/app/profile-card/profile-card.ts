import { Component, Input } from '@angular/core';
import { IProfile } from '../types/profile.types';
import { ImgUrlPipe } from '../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css',
})
export class ProfileCard {
  @Input() profile!: IProfile;
}
