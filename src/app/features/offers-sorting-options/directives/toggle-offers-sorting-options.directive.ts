import {Directive, EventEmitter, HostListener, Output, signal, WritableSignal} from '@angular/core';

@Directive({
  selector: '[appToggleSortOptions]',
})

export class ToggleSortOptionsDirective {
  @Output() sortOptionsToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isOpened: WritableSignal<boolean> = signal<boolean>(false);

  @HostListener('click')
  handleSortClick() {
    this.toggleOptions();
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.toggleOptions();
    }
  }

  private toggleOptions() {
    this.isOpened.set(!this.isOpened());
    this.sortOptionsToggled.emit(this.isOpened());
  }
}
