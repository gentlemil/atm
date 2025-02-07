import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LogoComponent, ButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass',
})
export class LandingPageComponent {
  private router = inject(Router);

  public navigateTo(path: string): Promise<boolean> {
    return this.router.navigate([path]);
  }
}
