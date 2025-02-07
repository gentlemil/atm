import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUserAccount } from '../../../core/models/types';

@Component({
  standalone: true,
  selector: 'app-credit-card',
  imports: [NgIf, DatePipe],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.sass',
})
export class CreditCardComponent {
  @Input({ required: true }) user!: IUserAccount;
}
