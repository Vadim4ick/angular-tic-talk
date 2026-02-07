import { Component, signal } from '@angular/core';
import { IconsModule } from '@/shared/lucide/lucide-module';
import { Dnd } from '@/shared/helpers/dirictive/dnd';

@Component({
  selector: 'app-avatar-upload',
  imports: [IconsModule, Dnd],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
})
export class AvatarUpload {
  preview = signal<string>('/avatar.png');

  fileBrowserHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];

    this.proccessFile(file);
  }

  onFileDropped(file: File) {
    this.proccessFile(file);
  }

  proccessFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
  }
}
