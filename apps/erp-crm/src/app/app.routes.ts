import { Routes } from '@angular/router';

import { AuthPlaceholderComponent } from './auth-placeholder/auth-placeholder.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  {
    path: 'crm',
    loadChildren: () => import('@erp-crm/crm/feature').then((m) => m.CRM_ROUTES),
  },
  {
    path: 'inventory',
    loadChildren: () => import('@erp-crm/inventory/feature').then((m) => m.INVENTORY_ROUTES),
  },
  {
    path: 'accounting',
    loadChildren: () => import('@erp-crm/accounting/feature').then((m) => m.ACCOUNTING_ROUTES),
  },
  { path: 'auth', component: AuthPlaceholderComponent },
  { path: '**', redirectTo: '' },
];
