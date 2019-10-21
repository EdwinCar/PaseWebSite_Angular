import { AuthService } from './../users/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap, take, filter, finalize} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefresh = false;
  private refreshSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getCurrentUser();

    if (request.method === 'POST' && !request.headers.has('X-Skip-Interceptor')) {
      if (currentUser && currentUser.tokens) {
        request = this.addTokenRequest(request, this.authService.getAuthToken());
      }
    }

    if (request.method === 'GET' && !request.headers.has('X-Skip-Interceptor')) {
      if (currentUser && currentUser.tokens) {
        request = this.addTokenRequest(request, this.authService.getAuthToken());
      }
    }
    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          console.log('Network', event);
        }
        return event;
      }),
      catchError(err => {
        switch (err.status) {
          case 401:
            console.log('unauthorized', err.message);
            this.unauthorized(request, next);
            break;
          case 400:
            console.log('not found', err.message);
            this.authService.logout();
            break;
        }
        return throwError(err);
      })
    );
  }

  private addTokenRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    request = request.clone({
      setHeaders: { authorization: `Bearer ${token}` }
    });
    return request;
  }

  private unauthorized(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefresh) {
      this.isRefresh = true;
      this.refreshSubject.next(null);

      return (
        this.authService.updateToken().subscribe(result => {
          if (result.state === 0) {
            this.refreshSubject.next(result.data.token);
            request = this.addTokenRequest(request, result.data.token);
          }
          return next.handle(request);
        }),
        catchError(err => {
          console.log('updateToken', err);
          this.authService.logout();
          return throwError(err);
        }),
        finalize(() => {
          this.isRefresh = false;
        })
      );
    } else {
      this.isRefresh = false;

      return this.refreshSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          request = this.addTokenRequest(request, token);
          return next.handle(request);
        })
      );
    }
  }

  private tokenExpired(currentUser: any): boolean {
    if (!currentUser || currentUser == null) {
      this.authService.logout();
      return;
    }

    if (currentUser.tokens) {
      return true;
    }

    const jwt = currentUser.tokens.split('.')[1];
    const base64 = jwt.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));

    if (Date.now() / 1000 > data.exp) {
      return false;
    }
    data.exp -= 240;
    return Date.now() / 1000 > data.exp;
  }
}
