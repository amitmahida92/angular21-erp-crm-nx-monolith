import { Routes } from '@angular/router';
import {
  CrmWorkspaceComponent,
  CustomersComponent,
  LeadsComponent,
  OpportunitiesComponent,
  PipelineComponent,
} from './crm-feature.component';

export const CRM_ROUTES: Routes = [
  {
    path: '',
    component: CrmWorkspaceComponent,
    children: [
      { path: '', pathMatch: 'full', component: LeadsComponent },
      { path: 'opportunities', component: OpportunitiesComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'pipeline', component: PipelineComponent },
    ],
  },
];
