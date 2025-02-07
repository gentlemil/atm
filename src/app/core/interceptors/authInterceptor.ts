import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { PersistanceService } from '../services/persistance.service';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`; // Client-side error
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; // Server-side error
      }
      toast.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
