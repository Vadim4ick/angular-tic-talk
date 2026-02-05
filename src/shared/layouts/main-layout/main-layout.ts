import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Profile } from '@/shared/service/profile';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  profileService = inject(Profile);

  ngOnInit() {
    this.profileService.getMe().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
