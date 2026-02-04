import { ImgUrlPipe } from '@/shared/helpers/pipes/img-url-pipe';
import { IProfile } from '@/shared/types/profile.types';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe],
  standalone: true,
  styleUrls: ['./subscriber-card.scss'],
  templateUrl: './subscriber-card.html',
})
export class SubscriberCard {
  @Input() profile!: IProfile;
}
