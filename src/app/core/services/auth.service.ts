import { PersistanceService } from './persistance.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IAuthResponse,
  IUserAccount,
  IUserAccountResponse,
  PinCode,
} from '../models/types';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly persistanceService = inject(PersistanceService);
  private readonly toast = inject(ToastrService);

  public login(pinCode: PinCode): Promise<IAuthResponse> {
    if (pinCode !== environment.validPassword) {
      return Promise.reject(new Error('Invalid password'));
      // TODO: display toast message
    }
    const url = API_URL + '/items/interview_auth';
    const headers = new HttpHeaders().set('X-Skip-Interceptor', 'true');

    return this.http
      .get<IAuthResponse>(url, { headers })
      .toPromise()
      .then((res: IAuthResponse | undefined) => {
        if (!res) {
          this.toast.error('Something went wrong. Try again.');
          return Promise.reject(new Error('No response received'));
        }
        this.persistanceService.set('accessToken', res.data[0].token);
        return res;
      });
  }

  public logout(): Promise<any> {
    return this.persistanceService.remove('accessToken');
  }

  public userData(): Observable<IUserAccount> {
    const url = API_URL + '/items/interview_user';
    return this.http
      .get<IUserAccountResponse>(url)
      .pipe(map((res) => res.data[0]));
  }
}
