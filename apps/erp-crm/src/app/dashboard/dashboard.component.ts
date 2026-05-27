import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { crmLeads, domainModuleDefinitions, invoices, products, shellKpis } from '@erp-crm/shared/data-access';
import { formatCurrency } from '@erp-crm/shared/util';
import { BadgeComponent, ButtonComponent, CardComponent, DataTableComponent } from '@erp-crm/shared/ui';

@Component({
  selector: 'app-dashboard',
  imports: [BadgeComponent, ButtonComponent, CardComponent, DataTableComponent, RouterLink],
  template: `
    <section class="dashboard">
      <div class="hero">
        <div>
          <ui-badge tone="info">Front-end only case study</ui-badge>
          <h2>Composable ERP/CRM workspace for modern Angular teams</h2>
          <p>
            The app shell owns layout and routing while CRM, Inventory, and
            Accounting stay isolated as lazy-loaded Nx feature libraries.
          </p>
        </div>
        <a routerLink="/crm">
          <ui-button>Open CRM</ui-button>
        </a>
      </div>

      <div class="kpis">
        @for (metric of metrics; track metric.label) {
          <ui-card>
            <div class="card-body kpi">
              <span>{{ metric.label }}</span>
              <strong>{{ metric.value }}</strong>
              <ui-badge [tone]="metric.tone">{{ metric.delta }}</ui-badge>
            </div>
          </ui-card>
        }
      </div>

      <div class="grid">
        <ui-card title="Domain boundaries" subtitle="Lazy-loaded through local Nx feature libraries">
          <div class="card-body domain-list">
            @for (domain of domains; track domain.moduleName) {
              <a [routerLink]="['/', domain.routePath]">
                <span>{{ domain.displayName }}</span>
                <small>{{ domain.moduleName }} · {{ domain.architectureRole }}</small>
              </a>
            }
          </div>
        </ui-card>

        <ui-card title="Today at a glance" subtitle="Mock ERP signals collected in the shell">
          <div class="card-body summary">
            <p>
              <strong>{{ leads.length }}</strong>
              active CRM leads worth
              <strong>{{ totalPipeline }}</strong>
            </p>
            <p>
              <strong>{{ lowStockCount }}</strong>
              products are below reorder point
            </p>
            <p>
              <strong>{{ overdueInvoices }}</strong>
              invoice requires finance follow-up
            </p>
          </div>
        </ui-card>
      </div>

      <ui-card title="Recent leads" subtitle="Shell can use shared contracts without owning CRM screens">
        <ui-data-table class="card-body" [columns]="leadColumns" [rows]="leads" />
      </ui-card>
    </section>
  `,
  styles: [
    `
      .dashboard {
        display: grid;
        gap: 1rem;
      }

      .hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1.5rem;
        border: 1px solid #dbeafe;
        border-radius: 0.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
      }

      h2 {
        max-width: 44rem;
        margin: 0.75rem 0 0.5rem;
        color: #0f172a;
        font-size: clamp(1.7rem, 4vw, 3rem);
        line-height: 1.04;
      }

      p {
        margin: 0;
        color: #475569;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .kpis {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1rem;
      }

      .kpi {
        display: grid;
        gap: 0.6rem;
      }

      .kpi span {
        color: #64748b;
        font-size: 0.85rem;
        font-weight: 700;
      }

      .kpi strong {
        color: #0f172a;
        font-size: 1.65rem;
      }

      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
        gap: 1rem;
      }

      .domain-list {
        display: grid;
        gap: 0.5rem;
      }

      .domain-list a {
        display: grid;
        gap: 0.15rem;
        padding: 0.85rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
      }

      .domain-list span {
        font-weight: 800;
      }

      .domain-list small {
        color: #64748b;
      }

      .summary {
        display: grid;
        gap: 0.85rem;
      }

      .summary strong {
        color: #0f766e;
      }

      @media (max-width: 1100px) {
        .kpis,
        .grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 720px) {
        .hero,
        .kpis,
        .grid {
          grid-template-columns: 1fr;
        }

        .hero {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    `,
  ],
})
export class DashboardComponent {
  protected readonly metrics = shellKpis;
  protected readonly domains = domainModuleDefinitions;
  protected readonly leads = crmLeads;
  protected readonly leadColumns = [
    { key: 'company', label: 'Company' },
    { key: 'stage', label: 'Stage', type: 'badge' },
    { key: 'value', label: 'Value', type: 'currency' },
    { key: 'owner', label: 'Owner' },
  ];

  protected readonly totalPipeline = formatCurrency(
    crmLeads.reduce((sum, lead) => sum + lead.value, 0),
  );
  protected readonly lowStockCount = products.filter((product) => product.stock <= product.reorderPoint).length;
  protected readonly overdueInvoices = invoices.filter((invoice) => invoice.status === 'Overdue').length;
}
