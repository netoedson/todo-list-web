import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '../../models/sign-up.model';
import { environment } from '../../../environments/environment';
import { SignIn } from '../../models/sign-in.model';
import { SingInResponse } from '../../interfaces/sign-in-response.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthApi {
  private baseUrl = environment.api;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  public signIn(signIn: SignIn): Promise<SingInResponse> {
    return this.http
      .post<SingInResponse>(`${this.baseUrl}auth/login`, signIn)
      .pipe(tap((result) => this.authService.startSession(result))).toPromise();
  }

  public signUp(request: SignUp): Promise<any> {
    return this.http.post(`${this.baseUrl}user`, request).toPromise();
  }
}
