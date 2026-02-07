import { NgModule } from '@angular/core';
import { Settings2, LucideAngularModule, Plus, Upload } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Settings2, Plus, Upload })],
  exports: [LucideAngularModule],
})
export class IconsModule {}
