import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CreditCardComponent } from '../../shared/credit-card/credit-card.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreditCardComponent, NgIf, AsyncPipe, ButtonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  private authService = inject(AuthService);

  public user$ = this.authService.userData();
}
