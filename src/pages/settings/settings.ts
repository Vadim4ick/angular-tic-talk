import { Profile } from '@/shared/service/profile';
import { Component, effect, inject } from '@angular/core';
import { ProfileHeader } from '@/components/profile-header/profile-header';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UbInputDirective } from '@/shared/ui/input';
import { UbTextAreaDirective } from '@/shared/ui/textarea';
import { UbButtonDirective } from '@/shared/ui/button';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [
    ProfileHeader,
    ReactiveFormsModule,
    UbInputDirective,
    UbTextAreaDirective,
    UbButtonDirective,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: this.fb.control<string[]>([]),
  });

  profileService = inject(Profile);

  profile = this.profileService.me;

  constructor() {
    effect(() => {
      const me = this.profileService.me();
      if (!me) return;

      this.form.patchValue({
        firstName: me.firstName ?? '',
        lastName: me.lastName ?? '',
        username: me.username ?? '',
      });
    });
  }

  submit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile(this.form.value));
  }
}
