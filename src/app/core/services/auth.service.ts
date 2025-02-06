import { PersistanceService } from './persistance.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IAuthResponse,
  IUserAccount,
  IUserAccountResponse,
  PinCode,
} from '../models/types';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

const API_URL: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly persistanceService = inject(PersistanceService);

  public login(pinCode: PinCode): Promise<IAuthResponse> {
    if (pinCode !== environment.validPassword) {
      throw new Error('Invalid password');
      // TODO: display toast message
    }
    const url = API_URL + '/items/interview_auth';
    return this.http
      .get<IAuthResponse>(url)
      .toPromise()
      .then((res: IAuthResponse | undefined) => {
        if (!res) {
          throw new Error('No response received');
          // TODO: toast message
        }
        this.persistanceService.set('accessToken', res.data[0].token);
        return res;
      });
  }

  public userData(): Observable<IUserAccount> {
    const url = API_URL + '/items/interview_user';
    return this.http
      .get<IUserAccountResponse>(url)
      .pipe(map((res) => res.data[0]));
  }
}
