import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './layout.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class LayoutComponent {}
