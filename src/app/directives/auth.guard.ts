import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('currentUser')) {
      this.IsTokenExpired();
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  private IsTokenExpired() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser || currentUser == null) {
      this.authService.logout();
    }

    const token = currentUser.tokens;
    const jwt = token.split('.')[1];
    const base64 = jwt.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));
    if ((Date.now() / 1000) > data.exp) {
      this.authService.logout();
    }
  }

}
