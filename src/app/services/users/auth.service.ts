import { IResponse } from './../shared/models/iresponse';
import { AuthRequest } from '../shared/models/requests/AuthRequest';
import { AppConfigService } from './../../app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;

  constructor(private client: HttpClient, private route: Router, private config: AppConfigService) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.tokens;
  }

  login(authRequest: AuthRequest): Observable<IResponse> {
    return this.client.post<IResponse>(this.config.getConfig('BaseUrl') + 'account/validate', authRequest);
  }

  logout() {
    this.token = null;
    sessionStorage.removeItem('currentUser');
    this.route.navigate(['/login']);
  }

  updateToken(): Observable<boolean> {
    console.log('UpdateToken: ', 'Send');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const refresh = new URLSearchParams();
    refresh.set('refresh_token', currentUser.tokens);

    return this.client.post<boolean>(this.config.getConfig('BaseUrl') + 'account/refresh', refresh);
  }
}
