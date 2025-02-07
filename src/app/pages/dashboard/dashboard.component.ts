import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { BalanceService } from '../../core/services/balance.service';

import { CreditCardComponent } from '../../shared/components/credit-card/credit-card.component';
import { LogoutButtonComponent } from '../../shared/components/logout-button/logout-button.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { IUserAccount } from '../../core/models/types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CreditCardComponent,
    NgIf,
    AsyncPipe,
    ButtonModule,
    RouterLink,
    LogoutButtonComponent,
    HeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private balanceService = inject(BalanceService);

  public user$: Observable<IUserAccount> = this.authService.userData();

  public navigateToWithdraw(balance: string): void {
    // We could also use 'Route Parameters', 'Query Parameters' or 'State', but because of a sensitive data
    // I want to share between components I decided to create new BalanceService which keeps information
    // about user account balance.
    this.balanceService.setBalance(+balance);
    this.router.navigate(['/withdraw']);
  }
}
