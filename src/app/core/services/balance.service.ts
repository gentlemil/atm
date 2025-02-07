import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balanceSubject = new BehaviorSubject<number | null>(null);

  setBalance(balance: number): void {
    this.balanceSubject.next(balance);
  }

  getBalance(): Observable<number | null> {
    return this.balanceSubject.asObservable();
  }
}
