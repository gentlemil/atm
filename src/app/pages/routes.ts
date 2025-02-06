import { Routes } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const ATM_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./landing-page/landing-page.component').then(
            (x) => x.LandingPageComponent
          ),
      },
      {
        path: 'login',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./login/login.component').then((x) => x.LoginComponent),
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (x) => x.DashboardComponent
          ),
      },
      {
        path: 'balance',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./balance/balance.component').then((x) => x.BalanceComponent),
      },
      {
        path: 'withdraw',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./withdraw/withdraw.component').then(
            (x) => x.WithdrawComponent
          ),
      },
    ],
  },
];
