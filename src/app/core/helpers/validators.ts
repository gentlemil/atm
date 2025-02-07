import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function decimalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const regex = /^\d+(\.\d{1,2})?$/;
    const valid = regex.test(value);
    return valid ? null : { invalidDecimal: true };
  };
}

export function maxWithdrawValidator(balance: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseFloat(control.value);
    if (isNaN(value)) {
      return { invalidNumber: true };
    }
    return value <= balance ? null : { exceedsBalance: true };
  };
}

export function numberWithMaxTwoDecimalsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const regex = /^\d+(\.\d{0,2})?$/;
    const valid = regex.test(value);
    return valid ? null : { invalidNumberWithTwoDecimals: true };
  };
}
