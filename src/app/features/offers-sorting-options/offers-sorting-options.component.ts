import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { sortType, sortTypeKeys } from '../../core/constants/const';
import { ToggleSortOptionsDirective } from './directives/toggle-offers-sorting-options.directive';
import { SelectOffersSortTypeDirective } from './directives/select-offers-sort-type.directive';

@Component({
  selector: 'app-offers-sorting-options',
  imports: [ToggleSortOptionsDirective, SelectOffersSortTypeDirective],
  templateUrl: './offers-sorting-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersSortingOptionsComponent {
  @Output() sortTypeSelected: EventEmitter<sortType> =
    new EventEmitter<sortType>();

  public readonly sortType = sortType;
  public isOpened: WritableSignal<boolean> = signal<boolean>(false);
  public readonly sortTypeKeys = sortTypeKeys;

  public onSortingOptionsToggled(isOpen: boolean) {
    this.isOpened.set(isOpen);
  }
}
