import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { products, stockMovements, warehouses } from '@erp-crm/shared/data-access';
import { BadgeComponent, CardComponent, DataTableComponent } from '@erp-crm/shared/ui';

@Component({
  selector: 'app-inventory-workspace',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <section class="domain-page">
      <header>
        <div>
          <p>Inventory feature library</p>
          <h2>Products, stock movements, and warehouse capacity</h2>
        </div>
        <nav>
          <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Products</a>
          <a routerLink="./movements" routerLinkActive="active">Stock movements</a>
          <a routerLink="./warehouses" routerLinkActive="active">Warehouses</a>
        </nav>
      </header>
      <router-outlet />
    </section>
  `,
  styles: [
    `
      .domain-page {
        display: grid;
        gap: 1rem;
      }

      header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;
      }

      p,
      h2 {
        margin: 0;
      }

      p {
        color: #0f766e;
        font-size: 0.8rem;
        font-weight: 900;
        text-transform: uppercase;
      }

      h2 {
        margin-top: 0.25rem;
        color: #0f172a;
        font-size: clamp(1.4rem, 2.4vw, 2rem);
      }

      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
      }

      nav a {
        padding: 0.55rem 0.75rem;
        border: 1px solid #cbd5e1;
        border-radius: 0.5rem;
        color: #334155;
        font-size: 0.875rem;
        font-weight: 800;
        text-decoration: none;
        background: #ffffff;
      }

      nav a.active {
        border-color: #0f766e;
        color: #0f766e;
        background: #ecfdf5;
      }

      @media (max-width: 780px) {
        header {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    `,
  ],
})
export class InventoryWorkspaceComponent {}

@Component({
  selector: 'app-products',
  imports: [BadgeComponent, CardComponent, DataTableComponent],
  template: `
    <div class="grid">
      <ui-card title="Products" subtitle="Catalog and reorder signals">
        <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
      </ui-card>
      <ui-card title="Reorder watch" subtitle="Items below stock policy">
        <div class="card-body watch">
          @for (product of lowStockProducts; track product.sku) {
            <article>
              <strong>{{ product.name }}</strong>
              <span>{{ product.stock }} in stock · reorder at {{ product.reorderPoint }}</span>
              <ui-badge tone="warning">Needs replenishment</ui-badge>
            </article>
          }
        </div>
      </ui-card>
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(18rem, 0.7fr);
        gap: 1rem;
      }

      .watch {
        display: grid;
        gap: 0.75rem;
      }

      article {
        display: grid;
        gap: 0.35rem;
        padding: 0.85rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
      }

      span {
        color: #64748b;
        font-size: 0.85rem;
      }

      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ProductsComponent {
  protected readonly rows = products;
  protected readonly lowStockProducts = products.filter((product) => product.stock <= product.reorderPoint);
  protected readonly columns = [
    { key: 'sku', label: 'SKU' },
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock', type: 'number' },
    { key: 'reorderPoint', label: 'Reorder point', type: 'number' },
    { key: 'unitPrice', label: 'Unit price', type: 'currency' },
  ];
}

@Component({
  selector: 'app-stock-movements',
  imports: [CardComponent, DataTableComponent],
  template: `
    <ui-card title="Stock movements" subtitle="Inbound, outbound, and adjustment transactions">
      <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
    </ui-card>
  `,
})
export class StockMovementsComponent {
  protected readonly rows = stockMovements;
  protected readonly columns = [
    { key: 'reference', label: 'Reference' },
    { key: 'product', label: 'Product' },
    { key: 'movementType', label: 'Type', type: 'badge' },
    { key: 'quantity', label: 'Quantity', type: 'number' },
    { key: 'warehouse', label: 'Warehouse' },
    { key: 'date', label: 'Date', type: 'date' },
  ];
}

@Component({
  selector: 'app-warehouses',
  imports: [CardComponent, DataTableComponent],
  template: `
    <ui-card title="Warehouses" subtitle="Capacity placeholder for distributed fulfillment">
      <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
    </ui-card>
  `,
})
export class WarehousesComponent {
  protected readonly rows = warehouses;
  protected readonly columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Name' },
    { key: 'city', label: 'City' },
    { key: 'utilization', label: 'Utilization %', type: 'number' },
    { key: 'status', label: 'Status', type: 'badge' },
  ];
}
