import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../models/comments';
import {Observable} from 'rxjs';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http: HttpClient = inject(HttpClient);

  public getComments(offerId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`);
  }

  public postComment(comment: string, rating: number, offerId: string): Observable<Comment> {
    return this.http.post<Comment>(`/${BASE_URL}/${APIRoute.COMMENTS}/${offerId}`, {comment, rating});
  }
}
