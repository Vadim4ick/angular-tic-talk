import { Component, inject } from '@angular/core';
import { ProfileCard } from './profile-card/profile-card';
import { Profile } from './service/profile';
import { IProfile } from './types/profile.types';

@Component({
  selector: 'app-root',
  imports: [ProfileCard],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  profileService = inject(Profile);
  profiles: IProfile[] = [];
  loading = true;

  ngOnInit() {
    this.profileService.getTestAccount().subscribe({
      next: (data) => {
        this.profiles = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
