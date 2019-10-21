import { IResponse } from './../shared/models/iresponse';
import { AuthRequest } from '../shared/models/requests/AuthRequest';
import { AppConfigService } from './../../app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private currentUser: any;

  constructor(private client: HttpClient, private route: Router, private config: AppConfigService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  login(authRequest: AuthRequest): Observable<IResponse> {
    return this.client.post<IResponse>(this.config.getConfig('BaseUrl') + 'account/validate', authRequest);
  }

  logout() {
    this.token = null;
    sessionStorage.removeItem('currentUser');
    this.route.navigate(['/login']);
  }

  updateToken(): Observable<IResponse> {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const refresh = {
      token: this.currentUser.tokens,
      refreshToken: this.currentUser.refresh
    };
    return this.client.post<IResponse>(this.config.getConfig('BaseUrl') + 'account/refresh', refresh).pipe(
      map(
        result => {
          console.log('RefreshToken: ', result);
          if (result.state === 0) {
            this.currentUser.tokens = result.data.token;
            this.currentUser.refresh = result.data.refreshToken;
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          } else {
            console.log('RefreshTokenE', result.message);
          }
          return result;
        }
      )
    );
  }

  getCurrentUser(): any {
    return this.currentUser === null ? JSON.parse(sessionStorage.getItem('currentUser')) : this.currentUser;
  }

  getAuthToken(): string {
    this.currentUser = this.currentUser === null ? JSON.parse(sessionStorage.getItem('currentUser')) : this.currentUser;
    this.token = this.currentUser && this.currentUser.tokens;
    return this.token;
  }
}
