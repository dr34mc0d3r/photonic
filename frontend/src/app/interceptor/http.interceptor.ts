import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'auth-token';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {
    console.log("AppHttpInterceptor: ");
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    const token = localStorage.getItem('auth_tkn');

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
      console.log("AppHttpInterceptor: ", req, token);
    }

    return next.handle(authReq);
  }
}
