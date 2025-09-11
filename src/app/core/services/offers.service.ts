import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferPreview } from '../models/offers';
import { BASE_URL } from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private http = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/offers`);
  }
}
