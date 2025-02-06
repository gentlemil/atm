import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { PersistanceService } from '../services/persistance.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.get('accessToken');
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return next(request);
};
