import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer, OfferPreview } from '../models/offers';
import { APIRoute, BASE_URL } from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private http = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/offers`);
  }

  public getOfferById(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${BASE_URL}/${APIRoute.OFFERS}/${id}`);
  }

  public getNearbyOffers(id: string): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.OFFERS}/${id}/nearby`);
}
}
