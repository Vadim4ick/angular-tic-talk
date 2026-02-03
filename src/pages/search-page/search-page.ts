import { Profile } from '@/shared/service/profile';
import { IProfile } from '@/shared/types/profile.types';
import { ProfileCard } from '@/components/profile-card/profile-card';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
})
export class SearchPage {
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
