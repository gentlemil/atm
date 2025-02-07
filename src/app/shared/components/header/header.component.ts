import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ` <h1 class="header">
    <ng-content></ng-content>
  </h1>`,
  styleUrl: './header.component.sass',
  imports: [],
})
export class HeaderComponent {}
