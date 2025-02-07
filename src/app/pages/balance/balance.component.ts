import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { map, Observable } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { IUserAccount } from '../../core/models/types';

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

  public userBalance$: Observable<string> = this.authService
    .userData()
    .pipe(map((res: IUserAccount) => res.account_balance));

  public logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
