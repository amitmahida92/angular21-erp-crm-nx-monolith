# Architecture Plan

`angular21-erp-crm-nx-monolith` is a modular Angular 21 Nx monolith. It exists to show the "before" state for a later migration to Angular micro-frontends.

## Objective

Build one deployable ERP/CRM Angular app with local domain boundaries that mirror the existing micro-frontend implementation.

## Boundaries

| Domain | Owns |
|---|---|
| Shell app | Layout, dashboard, top-level routing, auth placeholder, GitHub Pages deployment |
| CRM | Leads, opportunities, customers, pipeline |
| Inventory | Products, stock movements, warehouses, reorder indicators |
| Accounting | Invoices, payments, ledger |
| Shared UI | Buttons, cards, badges, data table, sidebar, topbar |
| Shared models | Typed contracts |
| Shared util | Formatting and status helpers |
| Shared data-access | Mock ERP/CRM data |

## Dependency Rules

- App may depend on feature libraries and shared libraries.
- Feature libraries may depend on same-domain libraries and shared libraries.
- Shared libraries must not depend on app or domain libraries.
- Domains must not import each other directly.
- Federation packages and remote manifests must not be added to this repo.
