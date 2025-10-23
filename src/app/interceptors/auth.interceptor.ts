import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip auth header for login and refresh endpoints
  if (req.url.includes('/login') || req.url.includes('/token/refresh')) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(authReq);
  }

  return next(req);
};
