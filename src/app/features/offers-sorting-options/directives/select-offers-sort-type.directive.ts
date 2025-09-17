import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { sortType } from '../../../core/constants/const';

@Directive({
  selector: '[appSelectOffersSortType]',
})
export class SelectOffersSortTypeDirective {
  @Output() sortTypeSelected: EventEmitter<sortType> =
    new EventEmitter<sortType>();

  @HostListener('click', ['$event'])
  onSortTypeClick(evt: MouseEvent): void {
    const target = evt.target as HTMLElement;
    const type = target.dataset['sortType'];
    if (type && this.isSortTypeKey(type)) {
      this.sortTypeSelected.emit(sortType[type]);
    }
  }

  private isSortTypeKey(key: string): key is keyof typeof sortType {
    return key in sortType;
  }
}
