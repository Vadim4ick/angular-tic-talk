import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProfileCard } from './profile-card/profile-card';
import { Profile } from './service/profile';
import { IProfile } from './types/profile.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  private profileService = inject(Profile);

  profiles: IProfile[] = [];
  loading = true;

  ngOnInit(): void {
    this.profileService.getTestAccount().subscribe({
      next: (data) => {
        this.profiles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
