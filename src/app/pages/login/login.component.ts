import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { PinAuthService } from '../../core/services/pin-auth.service';
import { IAuthResponse } from '../../core/models/types';

import { NumericKeyboardComponent } from '../../shared/components/numeric-keyboard/numeric-keyboard.component';
import { OnlyNumbersDirective } from '../../shared/directives/only-numbers.directive';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { InputErrorMessageComponent } from '../../shared/components/input-error-message/input-error-message.component';

import { PasswordModule } from 'primeng/password';
import { ToastrService } from 'ngx-toastr';

import _ from 'lodash';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NumericKeyboardComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    PasswordModule,
    AsyncPipe,
    OnlyNumbersDirective,
    HeaderComponent,
    InputErrorMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private pinAuthService = inject(PinAuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toast = inject(ToastrService);

  public form!: FormGroup;

  public isLocked$: Observable<boolean> = this.pinAuthService.isLocked$;
  public lockCounter$: Observable<number> = this.pinAuthService.lockCounter$;

  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.form = this.fb.group({
      pinCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
    });
  }

  public updatePinCodeFormControl(event: number | string): void {
    const currentValue = this.form.get('pinCode')?.value || '';
    // const newValue = currentValue + event;
    const newValue = _.concat(currentValue.split(''), event.toString()).join(
      // concat() function from 'lodash;
      ''
    );
    this.form.get('pinCode')?.setValue(newValue);
    this.makeTouchedAndDirty('pinCode');
  }

  public removeLastDigit(): void {
    const currentValue = this.form.get('pinCode')?.value || '';

    if (currentValue === '') {
      return;
    }

    //  const newValue = currentValue.slice(0, -1);                 // alternatively
    const newValue = _.dropRight(currentValue.split('')).join(''); // dropRight() function from 'lodash'
    this.form.get('pinCode')?.setValue(newValue);
    this.makeTouchedAndDirty('pinCode');
  }

  public login(): void {
    if (!this.form.valid) {
      return;
    }

    const pinCode = this.form.controls['pinCode'].value;
    const isValid = this.pinAuthService.validatePinCode(pinCode);

    if (!isValid) {
      this.toast.error('Invalid PIN. Try again.');
      return;
    }

    this.authService.login(pinCode).then((res: IAuthResponse) => {
      if (res.data[0].token) {
        this.toast.success('Login successful!');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public getUserDetails() {
    return this.authService
      .userData()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private makeTouchedAndDirty(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
      control.markAsDirty();
      control.markAsTouched();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
