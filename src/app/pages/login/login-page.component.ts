import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AppState } from '../../core/models/app-state';
import { Store } from '@ngrx/store';
import { login } from '../../store/user/actions/user.actions';
import { LoginRequest } from '../../core/models/login-request';
import { Router } from '@angular/router';
import { AppRoute } from '../../core/constants/const';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router: Router = inject(Router);

  public formGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')],
    ],
  });

  public onSubmit() {
    const { email, password } = this.formGroup.getRawValue();
    if (this.formGroup.valid && email !== null && password !== null) {
      const credentials: LoginRequest = { email, password };
      this.store.dispatch(login({ credentials }));
      this.router.navigate([AppRoute.MAIN]);
    }
  }
}
