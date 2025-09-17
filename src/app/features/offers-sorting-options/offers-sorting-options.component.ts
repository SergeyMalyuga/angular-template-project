import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {sortType} from '../../core/constants/const';
import {ToggleSortOptionsDirective} from './directives/toggle-offers-sorting-options.directive';

@Component({
  selector: 'app-offers-sorting-options',
  imports: [
    ToggleSortOptionsDirective
  ],
  templateUrl: './offers-sorting-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersSortingOptionsComponent {
  protected readonly sortType = sortType;
  public isOpened: WritableSignal<boolean> = signal<boolean>(false);

  public onSortingOptionsToggled(isOpen: boolean) {
    this.isOpened.set(isOpen);
  }
}
