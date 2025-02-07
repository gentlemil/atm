import { Directive, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[onlyNumbers]',
})
export class OnlyNumbersDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    input.dispatchEvent(new Event('input'));
  }
}
