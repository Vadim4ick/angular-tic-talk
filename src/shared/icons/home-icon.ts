import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 16 16" fill="currentColor">
      <path
        d="M6.65625 13.3438H3.34375V8H1.34375L8 2L14.6562 8H12.6562V13.3438H9.34375V9.34375H6.65625V13.3438Z"
      />
    </svg>
  `,
})
export class HomeIcon {
  @Input() size = 16;
}
