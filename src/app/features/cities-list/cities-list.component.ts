import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  inject,
  Input, Output,
} from '@angular/core';
import { CITY_LOCATIONS } from '../../core/constants/const';
import { City } from '../../core/models/city';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app-state';
import { changeCity } from '../../store/city/actions/city.actions';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesListComponent {
  @Input({ required: true }) currentCity!: City;
  @Output() citySelected: EventEmitter<void> = new EventEmitter<void>();

  private store = inject(Store<AppState>);
  public readonly cities: City[] = CITY_LOCATIONS;

  public onCitySelected(city: City): void {
    this.store.dispatch(changeCity({ city }));
    this.citySelected.emit();
  }
}
