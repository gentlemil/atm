import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';

import { NumericKeyboardComponent } from '../../shared/components/numeric-keyboard/numeric-keyboard.component';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NumericKeyboardComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    PasswordModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  public form!: FormGroup;

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
    this.authService.login(pinCode);
  }

  private makeTouchedAndDirty(control: string): void {
    this.form.get(control)?.markAsDirty();
    this.form.get(control)?.markAsTouched();
  }
}
