import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer, OfferPreview } from '../models/offers';
import { APIRoute, BASE_URL } from '../constants/const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOffersApiService {
  private http: HttpClient = inject(HttpClient);

  public getFavoriteOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`);
  }

  public addFavoriteOffer(offerId: string, status: string) {
    return this.http.post<Offer>(
      `${BASE_URL}/${APIRoute.FAVORITE}/${offerId}/${status}`,
      {},
    );
  }
}
