import { AuthService } from './../../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-logout-button',
  imports: [ButtonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.sass',
})
export class LogoutButtonComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  public logout(): Promise<void> {
    return this.authService.logout().then(() => {
      this.toast.success('Thank you for today!');
      this.router.navigate(['/']);
    });
  }
}
