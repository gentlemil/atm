import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { CreditCardComponent } from '../../shared/components/credit-card/credit-card.component';
import { LogoutButtonComponent } from '../../shared/components/logout-button/logout-button.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BalanceService } from '../../core/services/balance.service';

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

  public user$ = this.authService.userData();

  public navigateToWithdraw(balance: string): void {
    // We could also use 'Route Parameters', 'Query Parameters' or 'State', but because of a sensitive data
    // I decided to create new BalanceService which keeps information about user account balance.
    this.balanceService.setBalance(+balance);
    this.router.navigate(['/withdraw']);
  }
}
