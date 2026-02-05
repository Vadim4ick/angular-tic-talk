import { NgModule } from '@angular/core';
import { Settings2, LucideAngularModule } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Settings2 })],
  exports: [LucideAngularModule],
})
export class IconsModule {}
