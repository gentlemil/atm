import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo-container">
      <div class="logo">
        <span class="logo__text">EURONET</span>
      </div>
      <p class="subtitle">WORLDWIDE</p>
    </div>
  `,
  styleUrl: './logo.component.sass',
})
export class LogoComponent {}
