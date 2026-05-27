import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { crmLeads, customers, opportunities } from '@erp-crm/shared/data-access';
import { BadgeComponent, CardComponent, DataTableComponent } from '@erp-crm/shared/ui';

@Component({
  selector: 'app-crm-workspace',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <section class="domain-page">
      <header>
        <div>
          <p>CRM feature library</p>
          <h2>Leads, opportunities, and customer relationships</h2>
        </div>
        <nav>
          <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Leads</a>
          <a routerLink="./opportunities" routerLinkActive="active">Opportunities</a>
          <a routerLink="./customers" routerLinkActive="active">Customers</a>
          <a routerLink="./pipeline" routerLinkActive="active">Pipeline</a>
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
export class CrmWorkspaceComponent {}

@Component({
  selector: 'app-crm-leads',
  imports: [CardComponent, DataTableComponent],
  template: `
    <ui-card title="Leads" subtitle="Qualified pipeline data served from the CRM feature library">
      <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
    </ui-card>
  `,
})
export class LeadsComponent {
  protected readonly rows = crmLeads;
  protected readonly columns = [
    { key: 'id', label: 'Lead' },
    { key: 'company', label: 'Company' },
    { key: 'contact', label: 'Contact' },
    { key: 'stage', label: 'Stage', type: 'badge' },
    { key: 'value', label: 'Value', type: 'currency' },
    { key: 'owner', label: 'Owner' },
  ];
}

@Component({
  selector: 'app-crm-opportunities',
  imports: [CardComponent, DataTableComponent],
  template: `
    <ui-card title="Opportunities" subtitle="Route boundary owned by CRM">
      <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
    </ui-card>
  `,
})
export class OpportunitiesComponent {
  protected readonly rows = opportunities;
  protected readonly columns = [
    { key: 'id', label: 'Opportunity' },
    { key: 'title', label: 'Title' },
    { key: 'account', label: 'Account' },
    { key: 'probability', label: 'Probability', type: 'number' },
    { key: 'expectedClose', label: 'Expected close', type: 'date' },
    { key: 'value', label: 'Value', type: 'currency' },
  ];
}

@Component({
  selector: 'app-crm-customers',
  imports: [CardComponent, DataTableComponent],
  template: `
    <ui-card title="Customers" subtitle="Customer health is represented with shared badge tones">
      <ui-data-table class="card-body" [columns]="columns" [rows]="rows" />
    </ui-card>
  `,
})
export class CustomersComponent {
  protected readonly rows = customers;
  protected readonly columns = [
    { key: 'id', label: 'Customer ID' },
    { key: 'name', label: 'Name' },
    { key: 'segment', label: 'Segment' },
    { key: 'region', label: 'Region' },
    { key: 'health', label: 'Health', type: 'badge' },
    { key: 'recurringRevenue', label: 'MRR', type: 'currency' },
  ];
}

@Component({
  selector: 'app-crm-pipeline',
  imports: [BadgeComponent, CardComponent, CurrencyPipe],
  template: `
    <ui-card title="Pipeline board" subtitle="Kanban placeholder for the next case-study iteration">
      <div class="card-body board">
        @for (stage of stages; track stage) {
          <section>
            <h3>{{ stage }}</h3>
            @for (lead of rowsFor(stage); track lead.id) {
              <article>
                <strong>{{ lead.company }}</strong>
                <span>{{ lead.contact }}</span>
                <ui-badge tone="info">{{ lead.value | currency: 'USD' : 'symbol' : '1.0-0' }}</ui-badge>
              </article>
            }
          </section>
        }
      </div>
    </ui-card>
  `,
  styles: [
    `
      .board {
        display: grid;
        grid-template-columns: repeat(4, minmax(13rem, 1fr));
        gap: 1rem;
        overflow-x: auto;
      }

      section {
        display: grid;
        align-content: start;
        gap: 0.75rem;
        min-height: 17rem;
        padding: 0.85rem;
        border-radius: 0.5rem;
        background: #f8fafc;
      }

      h3 {
        margin: 0;
        color: #334155;
        font-size: 0.9rem;
      }

      article {
        display: grid;
        gap: 0.35rem;
        padding: 0.8rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        background: #ffffff;
      }

      article span {
        color: #64748b;
        font-size: 0.85rem;
      }
    `,
  ],
})
export class PipelineComponent {
  protected readonly stages = ['New', 'Qualified', 'Proposal', 'Won'] as const;
  protected readonly rowsFor = (stage: (typeof this.stages)[number]) =>
    crmLeads.filter((lead) => lead.stage === stage);
}
