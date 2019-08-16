import { of, throwError } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

export function responseInterceptor(key) {
  return (obs) => {
    return obs.pipe(
      switchMap((response) => {
        if (response.errors) {
          return throwError(response.errors);
        }
        return of(response.data);
      }),
      pluck(key),
    );
  };
}
