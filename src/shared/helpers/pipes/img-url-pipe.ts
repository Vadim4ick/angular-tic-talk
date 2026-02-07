import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(value?: string): string | null {
    if (!value) return null;

    if (value == '/avatar.png' || value.startsWith('data:image')) return value;

    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
