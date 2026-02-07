import { Component, inject } from '@angular/core';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { sidebarMenu } from '@/shared/const/navbar.const';
import { RouterLink } from '@angular/router';
import { Profile } from '@/shared/service/profile';
import { SubscriberCard } from '@/shared/ui/subscriber-card/subscriber-card';
import { ImgUrlPipe } from '@/shared/helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [NgComponentOutlet, RouterLink, AsyncPipe, SubscriberCard, ImgUrlPipe],
  standalone: true,
  styleUrls: ['./sidebar.scss'],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  profileService = inject(Profile);
  me = inject(Profile).me;

  subscribers$ = this.profileService.getSubscribers();

  sidebarMenu = sidebarMenu;
}
