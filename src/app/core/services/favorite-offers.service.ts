import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfferPreview } from '../models/offers';
import { APIRoute, BASE_URL } from '../constants/const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOffersService {
  private http: HttpClient = inject(HttpClient);

  public getFavoriteOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`);
  }
}
