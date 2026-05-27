import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { invoices, ledgerEntries, payments } from '@erp-crm/shared/data-access';
import { BadgeComponent, CardComponent, DataTableComponent } from '@erp-crm/shared/ui';

@Component({
  selector: 'app-accounting-workspace',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <section class="domain-page">
      <header>
        <div>
          <p>Accounting feature library</p>
          <h2>Invoices, payments, and general ledger placeholders</h2>
        </div>
        <nav>
          <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Invoices</a>
          <a routerLink="./payments" routerLinkActive="active">Payments</a>
          <a routerLink="./ledger" routerLinkActive="active">Ledger</a>
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
export class AccountingWorkspaceComponent {}

@Component({
  selector: 'app-invoices',
  imports: [CardComponent, DataTableComponent],
  template: `
    <ui-card title="Invoices" subtitle="Finance workflow without real API integration yet">
      <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
    </ui-card>
  `,
})
export class InvoicesComponent {
  protected readonly rows = invoices;
  protected readonly columns = [
    { key: 'number', label: 'Invoice' },
    { key: 'customer', label: 'Customer' },
    { key: 'dueDate', label: 'Due date', type: 'date' },
    { key: 'amount', label: 'Amount', type: 'currency' },
    { key: 'status', label: 'Status', type: 'badge' },
  ];
}

@Component({
  selector: 'app-payments',
  imports: [CardComponent, DataTableComponent],
  template: `
    <ui-card title="Payments" subtitle="Payment records represented as mock data">
      <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
    </ui-card>
  `,
})
export class PaymentsComponent {
  protected readonly rows = payments;
  protected readonly columns = [
    { key: 'reference', label: 'Reference' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'amount', label: 'Amount', type: 'currency' },
    { key: 'method', label: 'Method' },
  ];
}

@Component({
  selector: 'app-ledger',
  imports: [BadgeComponent, CardComponent, DataTableComponent],
  template: `
    <div class="grid">
      <ui-card title="Ledger placeholder" subtitle="Trial balance view for the future accounting domain">
        <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
      </ui-card>
      <ui-card title="Backend integration note" subtitle="Reserved for Java microservices">
        <div class="card-body note">
          <ui-badge tone="info">Next article</ui-badge>
          <p>
            Ledger posting, audit trails, and financial controls belong behind
            service APIs. This article keeps the monolith front-end-only.
          </p>
        </div>
      </ui-card>
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
        gap: 1rem;
      }

      .note {
        display: grid;
        gap: 0.85rem;
        color: #475569;
        line-height: 1.65;
      }

      p {
        margin: 0;
      }

      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class LedgerComponent {
  protected readonly rows = ledgerEntries;
  protected readonly columns = [
    { key: 'account', label: 'Account' },
    { key: 'debit', label: 'Debit', type: 'currency' },
    { key: 'credit', label: 'Credit', type: 'currency' },
    { key: 'period', label: 'Period' },
  ];
}
