import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { APIRoute, BASE_URL } from '../constants/const';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http: HttpClient = inject(HttpClient);

  public getUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.LOGIN}`);
  }

  public postUser(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.LOGIN}`, {
      email: credentials.email,
      password: credentials.password,
    });
  }

  public deleteUser(): void {
    this.http.delete(`${BASE_URL}/${APIRoute.LOGIN}`);
  }
}
