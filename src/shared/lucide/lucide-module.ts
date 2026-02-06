import { NgModule } from '@angular/core';
import { Settings2, LucideAngularModule, Plus } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Settings2, Plus })],
  exports: [LucideAngularModule],
})
export class IconsModule {}
