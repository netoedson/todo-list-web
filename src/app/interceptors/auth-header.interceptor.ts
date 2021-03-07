import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  private excludeUrls: Array<string>;
  constructor(private readonly authService: AuthService) {
    this.excludeUrls = ['login', 'user'];
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isUrlValidate(request.url)) {
      const modified = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` },
      });

      return next.handle(modified);
    }

    return next.handle(request);
  }

  private isUrlValidate(url: string) {
    const endpoint = url.split('/').pop();

    return !this.excludeUrls.includes(endpoint);
  }
}
