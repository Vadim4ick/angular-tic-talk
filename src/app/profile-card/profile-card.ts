import { Component, Input } from '@angular/core';
import { IProfile } from '../types/profile.types';

@Component({
  selector: 'app-profile-card',
  imports: [],
  standalone: true,
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css',
})
export class ProfileCard {
  @Input() profile!: IProfile;
}
