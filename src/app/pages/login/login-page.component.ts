import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AppState } from '../../core/models/app.state';
import { Store } from '@ngrx/store';
import { login } from '../../store/user/actions/user.actions';
import { LoginRequest } from '../../core/models/login-request';
import { Router, RouterLink } from '@angular/router';
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import { loadFavoriteOffers } from '../../store/favorite-offers/actions/favorite-offers.actions';
import { loadOffersData } from '../../store/offers/actions/offers.actions';
import { selectAuthStatus } from '../../store/app/app.selectors';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
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
    if (this.formGroup.valid) {
      if (email && password) {
        const credentials: LoginRequest = { email, password };
        this.store.dispatch(login({ credentials }));
      }
      this.store
        .select(selectAuthStatus)
        .pipe(
          filter(
            (auth: AuthorizationStatus) => auth === AuthorizationStatus.AUTH,
          ),
          take(1),
        )
        .subscribe(() => {
          this.store.dispatch(loadFavoriteOffers());
          this.store.dispatch(loadOffersData());
          this.router.navigate([AppRoute.MAIN]);
        });
    }
  }

  protected readonly AppRoute = AppRoute;
}
