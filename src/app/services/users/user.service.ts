import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserCurrent } from '../shared/models/UserCurrent';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient, private authService: AuthService) { }

  getUserToken(): UserCurrent {
    const userCurrent = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!userCurrent || userCurrent == null) {
      this.authService.logout();
    }

    const token = userCurrent.tokens;
    const jwt = token.split('.')[1];
    const base64 = jwt.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));
    return data as UserCurrent;
  }
}
