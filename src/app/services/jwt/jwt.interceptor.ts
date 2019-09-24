import { AuthService } from './../users/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (request.method === 'POST' && this.IsTokenExpired(currentUser) && !request.headers.has('X-Skip-Interceptor')) {
      console.log('Valid token: ', request.method, this.IsTokenExpired(currentUser), !request.headers.has('X-Skip-Interceptor'));

      // return this.authService.updateToken().pipe(mergeMap(res => {
      //   return this.intercept(request, next);
      // }));
    }

    if (request.method === 'POST' && !request.headers.has('X-Skip-Interceptor')) {
      if (currentUser && currentUser.tokens) {
        request = request.clone({
          setHeaders: {authorization: `Bearer ${currentUser.tokens}`}
        });
      }
    }
    return next.handle(request);
  }

  private IsTokenExpired(currentUser: any): boolean {
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

    if ((Date.now() / 1000) > data.exp) {
      return false;
    }
    data.exp -= 240;
    return (Date.now() / 1000) > data.exp;
  }


  // const token: string = localStorage.getItem('token');

  //   let request = req;

  //   if (token) {
  //     request = req.clone({
  //       setHeaders: {
  //         authorization: `Bearer ${ token }`
  //       }
  //     });
  //   }

  //   return next.handle(request);
  // }



}
