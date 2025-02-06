import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LogoComponent, ButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass',
})
export class LandingPageComponent {
  private router = inject(Router);

  public navigateTo(path: string) {
    return this.router.navigate([path]);
  }
}
