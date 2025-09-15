import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppState } from './core/models/app-state';
import { Store } from '@ngrx/store';
import { loadOffersData } from './store/offers/actions/offers.actions';
import { checkAuthStatus } from './store/user/actions/user.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);

  public ngOnInit() {
    this.store.dispatch(loadOffersData());
    // this.store.dispatch(checkAuthStatus());
  }
}
