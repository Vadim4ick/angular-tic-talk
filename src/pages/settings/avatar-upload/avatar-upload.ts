import { Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { IconsModule } from '@/shared/lucide/lucide-module';
import { Dnd } from '@/shared/helpers/dirictive/dnd';
import { FormsModule } from '@angular/forms';
import { ImgUrlPipe } from '@/shared/helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-avatar-upload',
  imports: [IconsModule, Dnd, FormsModule, ImgUrlPipe],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
})
export class AvatarUpload {
  preview = signal<string>('/avatar.png');

  @Output() avatarChange = new EventEmitter<File | null>();

  private avatarFile: File | null = null;

  fileBrowserHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] ?? null;

    this.processFile(file);
    target.value = '';
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  private processFile(file: File | null) {
    if (!file || !file.type.startsWith('image/')) return;

    this.avatarFile = file;
    this.avatarChange.emit(file);

    const reader = new FileReader();
    reader.onload = (e) => this.preview.set(String(e.target?.result ?? ''));
    reader.readAsDataURL(file);
  }
}
