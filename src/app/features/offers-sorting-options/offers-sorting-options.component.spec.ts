import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersSortingOptionsComponent } from './offers-sorting-options.component';

describe('OffersSortingOptionsComponent', () => {
  let component: OffersSortingOptionsComponent;
  let fixture: ComponentFixture<OffersSortingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersSortingOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OffersSortingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
