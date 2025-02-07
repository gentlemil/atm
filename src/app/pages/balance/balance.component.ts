import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { map } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [NgIf, AsyncPipe, ButtonModule, RouterLink, HeaderComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.sass',
})
export class BalanceComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public userBalance$ = this.authService
    .userData()
    .pipe(map((res) => res.account_balance));

  public logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
