import { Component, signal } from '@angular/core';
import { IconsModule } from '@/shared/lucide/lucide-module';

@Component({
  selector: 'app-avatar-upload',
  imports: [IconsModule],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
})
export class AvatarUpload {
  preview = signal<string>('/avatar.png');

  fileBrowserHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];

    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
  }
}
