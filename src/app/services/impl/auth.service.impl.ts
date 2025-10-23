import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { AuthenticationServiceClient } from '../../clients/authentication-service.client';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceImpl implements AuthenticationService {
  public constructor(private client: AuthenticationServiceClient) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.client.login(loginRequest);
  }

  public logout(): void {}
}
