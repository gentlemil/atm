import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BalanceService } from '../../core/services/balance.service';

import {
  decimalValidator,
  maxWithdrawValidator,
} from '../../core/helpers/validators';

import { Subject, takeUntil } from 'rxjs';

import { HeaderComponent } from '../../shared/components/header/header.component';
import { InputErrorMessageComponent } from '../../shared/components/input-error-message/input-error-message.component';
import { NumericKeyboardComponent } from '../../shared/components/numeric-keyboard/numeric-keyboard.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ToastrService } from 'ngx-toastr';

import _ from 'lodash';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    InputErrorMessageComponent,
    InputTextModule,
    NumericKeyboardComponent,
  ],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.sass',
})
export class WithdrawComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly balanceService = inject(BalanceService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);

  public form!: FormGroup;

  public balance!: number;

  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.balanceService
      .getBalance()
      .pipe(takeUntil(this.destroy$))
      .subscribe((balance: number | null) => {
        if (balance !== null) {
          this.balance = balance;
          this.form = this.fb.group({
            amount: new FormControl('', [
              Validators.required,
              Validators.pattern('^[0-9.]*$'),
              decimalValidator(),
              maxWithdrawValidator(this.balance),
            ]),
          });
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  public withdraw(): void {
    if (this.form.valid) {
      const amount = this.form.controls['amount'].value;
      this.toast.success(
        `You have just withdraw ${amount}$. You have ${
          this.balance - amount
        }$ funds left in your account!`
      );
      this.form.patchValue({
        amount: 0,
      });
    } else {
      this.toast.error('Invalid amount!');
    }
  }

  public updateAmountFormControl(event: number | string): void {
    const currentValue = this.form.get('amount')?.value || '';
    // const newValue = currentValue + event;
    const newValue = _.concat(currentValue.split(''), event.toString()).join(
      // concat() function from 'lodash;
      ''
    );
    this.form.get('amount')?.setValue(newValue);
    this.makeTouchedAndDirty('amount');
  }

  public removeLastDigit(): void {
    const currentValue = this.form.get('amount')?.value || '';
    //  const newValue = currentValue.slice(0, -1);
    const newValue = _.dropRight(currentValue.split('')).join(''); // dropRight() function from 'lodash'
    this.form.get('amount')?.setValue(newValue);
    this.makeTouchedAndDirty('amount');
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
