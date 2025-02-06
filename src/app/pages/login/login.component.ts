import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { PinAuthService } from '../../core/services/pin-auth.service';

import { NumericKeyboardComponent } from '../../shared/components/numeric-keyboard/numeric-keyboard.component';

import { PasswordModule } from 'primeng/password';
import { Observable } from 'rxjs';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private pinAuthService = inject(PinAuthService);
  private fb = inject(FormBuilder);

  public form!: FormGroup;

  public isLocked$: Observable<boolean> = this.pinAuthService.isLocked$;
  public lockCounter$: Observable<number> = this.pinAuthService.lockCounter$;

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

  public updatePinCodeFormControl(event: number): void {
    const currentValue = this.form.get('pinCode')?.value || '';
    const newValue = currentValue + event;
    this.form.get('pinCode')?.setValue(newValue);
    this.makeTouchedAndDirty('pinCode');
  }

  public removeLastDigit(): void {
    const currentValue = this.form.get('pinCode')?.value || '';
    const newValue = currentValue.slice(0, -1);
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
      console.log('Invalid PIN');
      return;
    }

    this.authService.login(pinCode).then((res) => {
      console.log(res);
      console.log('Login successful');
    });
  }

  public getUserDetails() {
    return this.authService.userData().subscribe();
  }

  private makeTouchedAndDirty(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
      control.markAsDirty();
      control.markAsTouched();
    }
  }
}
