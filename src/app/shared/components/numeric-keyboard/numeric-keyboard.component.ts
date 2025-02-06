import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-numeric-keyboard',
  templateUrl: './numeric-keyboard.component.html',
  styleUrl: './numeric-keyboard.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, ButtonModule],
})
export class NumericKeyboardComponent {
  @Output() keyboardEmitter = new EventEmitter<number>();
  @Output() removeLastDigitEmitter = new EventEmitter<void>();
  @Output() confirmPinCodeEmitter = new EventEmitter<void>();
}
