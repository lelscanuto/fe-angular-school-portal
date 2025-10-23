import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationServiceImpl } from './services/impl/auth.service.impl';
import { AUTH_SERVICE } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

    {
      provide: AUTH_SERVICE,
      useClass: AuthenticationServiceImpl,
    },
  ],
};
