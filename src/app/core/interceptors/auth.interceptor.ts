import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';

import { PersistanceService } from '../services/persistance.service';

import { ToastrService } from 'ngx-toastr';

import _ from 'lodash';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService);
  const toast = inject(ToastrService);

  if (request.headers.has('X-Skip-Interceptor')) {
    const headers = request.headers.delete('X-Skip-Interceptor');
    return next(request.clone({ headers }));
  }

  const token = persistanceService.get('accessToken');

  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(request).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        _.map(error.errors, (err) => {
          console.error(`Error: ${err.message}`);
          toast.error(`err.message`);
        });
      }
      toast.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
