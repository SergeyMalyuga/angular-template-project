import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appToggleFavoriteOffer]',
})
export class ToggleFavoriteOfferDirective {
  @Output() favoriteOfferToggled: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  handleToggleFavorite(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.toggle('place-card__bookmark-button--active');
    this.favoriteOfferToggled.emit();
  }
}
