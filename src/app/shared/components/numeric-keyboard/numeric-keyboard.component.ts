import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
  @Input({ required: false }) disabled = false;
  @Input({ required: false }) showComma = false;

  @Output() keyboardEmitter = new EventEmitter<number | string>();
  @Output() removeLastDigitEmitter = new EventEmitter<void>();
  @Output() confirmPinCodeEmitter = new EventEmitter<void>();
}
