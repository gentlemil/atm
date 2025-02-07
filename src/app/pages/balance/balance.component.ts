import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { map } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [NgIf, AsyncPipe, ButtonModule, RouterLink],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.sass',
})
export class BalanceComponent {
  private authService = inject(AuthService);

  public userBalance$ = this.authService
    .userData()
    .pipe(map((res) => res.account_balance));
}
