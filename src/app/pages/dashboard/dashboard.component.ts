import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CreditCardComponent } from '../../shared/components/credit-card/credit-card.component';
import { LogoutButtonComponent } from '../../shared/components/logout-button/logout-button.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

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

  public user$ = this.authService.userData();
}
