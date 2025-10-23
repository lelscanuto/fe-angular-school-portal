import { LoginRequest, LoginResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface AuthenticationService {
  login(loginRequest: LoginRequest): Observable<LoginResponse>;
  logout(): void;
  //   refreshToken(): Observable<LoginResponse>;
}

// This becomes your runtime token
export const AUTH_SERVICE = new InjectionToken<AuthenticationService>(
  'AUTH_SERVICE'
);
