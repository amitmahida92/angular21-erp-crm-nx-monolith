# Angular 21 ERP/CRM Nx Monolith

This repository is the "before" architecture for a practical Angular 21 migration article: the same ERP/CRM product surface starts as a clean Nx modular monolith, then moves toward a shell-and-remotes micro-frontend architecture.

## Live Demo

Expected GitHub Pages URL:

```text
https://amitmahida92.github.io/angular21-erp-crm-nx-monolith/
```

Existing micro-frontend reference:

- Shell host: https://github.com/amitmahida92/angular21-erp-crm-shell
- CRM remote: https://github.com/amitmahida92/angular21-erp-crm-crm-app
- Inventory remote: https://github.com/amitmahida92/angular21-erp-crm-inventory-app
- Accounting remote: https://github.com/amitmahida92/angular21-erp-crm-accounting-app
- Consolidated MFE workspace: https://github.com/amitmahida92/angular21-erp-crm-microfrontends
- Live MFE demo: https://amitmahida92.github.io/angular21-erp-crm-shell/

## Architecture

- Angular 21
- Nx workspace
- One deployable Angular app: `erp-crm`
- Lazy-loaded local feature libraries
- Domain libraries for CRM, Inventory, and Accounting
- Shared libraries for UI, models, utilities, and mock data
- GitHub Pages deployment
- No Native Federation
- No remote apps
- No backend integration

## Folder Structure

```text
apps/erp-crm
libs/crm/feature
libs/crm/data-access
libs/crm/ui
libs/inventory/feature
libs/inventory/data-access
libs/inventory/ui
libs/accounting/feature
libs/accounting/data-access
libs/accounting/ui
libs/shared/ui
libs/shared/models
libs/shared/util
libs/shared/data-access
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Dashboard |
| `/auth` | Auth placeholder |
| `/crm` | Leads |
| `/crm/opportunities` | CRM opportunities |
| `/crm/customers` | CRM customers |
| `/crm/pipeline` | CRM pipeline |
| `/inventory` | Products |
| `/inventory/movements` | Stock movements |
| `/inventory/warehouses` | Warehouses |
| `/accounting` | Invoices |
| `/accounting/payments` | Payments |
| `/accounting/ledger` | Ledger |

## Feature Parity Notes

The monolith must look and behave like the existing MFE demo. Sales is represented through CRM opportunities and pipeline. HR is not part of the current MFE surface and is intentionally not implemented here.

## Local Development

```bash
npm install
npm start
```

Open:

```text
http://localhost:4200
```

## Build

```bash
npm run build
```

GitHub Pages build:

```bash
npm run build:gh-pages
```

Final repository publishing and Pages enablement steps are documented in [docs/publish-checklist.md](docs/publish-checklist.md).

## Migration Story

The domain feature libraries are intentionally shaped as future extraction points:

| Monolith | Future micro-frontend |
|---|---|
| `libs/crm/feature` | CRM remote app |
| `libs/inventory/feature` | Inventory remote app |
| `libs/accounting/feature` | Accounting remote app |
| `apps/erp-crm` | Shell host |
| `libs/shared/*` | Shared UI, contracts, utilities |

The migration replaces local lazy-loaded routes with runtime remote route loading while preserving the same user-facing routes and screens.

## Out Of Scope

- Native Federation in this repo
- Remote entry files
- Separately deployed remotes
- Backend integration
- Standalone Sales module
- HR module
