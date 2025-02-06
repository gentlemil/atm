import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { environment } from '../../../environments/environment';

const MAX_ATTEMPTS = 3;
const VALID_PASSWORD = environment.validPassword;

@Injectable({
  providedIn: 'root',
})
export class PinAuthService {
  private readonly correctPinCode: string = VALID_PASSWORD;
  private attempts: number = 0;
  private lockDuration: number = 5000; // 5 seconds

  private isLockedSubject$ = new BehaviorSubject<boolean>(false);
  private lockCounterSubject$ = new BehaviorSubject<number>(
    this.lockDuration / 1000
  );

  get isLocked$(): Observable<boolean> {
    return this.isLockedSubject$.asObservable();
  }

  get lockCounter$(): Observable<number> {
    return this.lockCounterSubject$.asObservable();
  }

  public validatePinCode(pinCode: string): boolean {
    if (this.isLockedSubject$.value) {
      return false;
    }

    if (pinCode === this.correctPinCode) {
      this.resetAttempts();
      return true;
    } else {
      this.attempts++;
      if (this.attempts >= MAX_ATTEMPTS) {
        this.lockKeyboard();
      }
      return false;
    }
  }

  private resetAttempts(): void {
    this.attempts = 0;
  }

  private lockKeyboard(): void {
    this.isLockedSubject$.next(true);
    this.startLockCounter();
    timer(this.lockDuration).subscribe(() => {
      this.isLockedSubject$.next(false);
      this.resetAttempts();
      this.lockCounterSubject$.next(this.lockDuration / 1000);
    });
  }

  private startLockCounter(): void {
    let counter = this.lockDuration / 1000;
    const interval = setInterval(() => {
      counter--;
      this.lockCounterSubject$.next(counter);
      if (counter <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
