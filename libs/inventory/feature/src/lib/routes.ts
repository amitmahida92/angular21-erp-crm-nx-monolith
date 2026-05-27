import { Routes } from '@angular/router';
import {
  InventoryWorkspaceComponent,
  ProductsComponent,
  StockMovementsComponent,
  WarehousesComponent,
} from './inventory-feature.component';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    component: InventoryWorkspaceComponent,
    children: [
      { path: '', pathMatch: 'full', component: ProductsComponent },
      { path: 'movements', component: StockMovementsComponent },
      { path: 'warehouses', component: WarehousesComponent },
    ],
  },
];
