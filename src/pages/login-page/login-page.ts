import { UbInputDirective } from '@/shared/ui/input';
import { Component, inject } from '@angular/core';
import { UbButtonDirective } from '@/shared/ui/button';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '@/shared/service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [UbInputDirective, UbButtonDirective, UbButtonDirective, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  authService = inject(Auth);
  router = inject(Router);

  form = new FormGroup({
    telegram: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe({
        next: (res) => this.router.navigate(['']),
        error: (err) => console.error('ERR', err),
      });
    }
  }
}
