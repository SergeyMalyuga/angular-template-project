import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appToggleFavoriteOffer]',
})
export class ToggleFavoriteOfferDirective {
  @Output() favoriteOfferToggled: EventEmitter<void> = new EventEmitter<void>();
  @Input({ required: true }) isFavoritePage!: boolean;

  @HostListener('click', ['$event'])
  handleToggleFavorite(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    if (this.isFavoritePage) {
      target.classList.toggle('offer__bookmark-button--active');
    } else {
      target.classList.toggle('place-card__bookmark-button--active');
    }
    this.favoriteOfferToggled.emit();
  }
}
