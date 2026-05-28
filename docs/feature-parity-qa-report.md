# Feature Parity QA Report

Date: 2026-05-28

## Scope

This report compares the live Angular 21 micro-frontend ERP/CRM reference with the new Nx modular monolith.

Reference MFE:

- Live shell: https://amitmahida92.github.io/angular21-erp-crm-shell/
- Local source: `/Users/amitm/Documents/angular-mfe/angular21-erp-crm-shell`
- CRM remote source: `/Users/amitm/Documents/angular-mfe/angular21-erp-crm-crm-app`
- Inventory remote source: `/Users/amitm/Documents/angular-mfe/angular21-erp-crm-inventory-app`
- Accounting remote source: `/Users/amitm/Documents/angular-mfe/angular21-erp-crm-accounting-app`

Nx monolith:

- Live app: https://amitmahida92.github.io/angular21-erp-crm-nx-monolith/
- Local source: `/Users/amitm/Documents/angular-mfe/angular21-erp-crm-nx-monolith`

## Executive Result

Feature parity is functionally complete.

The monolith preserves the same route map, dashboard signals, domain screens, mock data records, table columns, shared UI behavior, and GitHub Pages SPA deployment behavior as the MFE reference.

The only user-visible variance found is architecture-specific copy. The MFE says "remote" and "micro-frontend" in a few places, while the monolith says "feature library" and "monolith". This is useful for the article narrative, but it means screenshots are not text-identical.

## Live Deployment Checks

| Check | MFE result | Monolith result | Status |
|---|---|---|---|
| Root URL | HTTP 200 | HTTP 200 | Pass |
| Deep links | GitHub Pages HTTP 404 with SPA fallback HTML | GitHub Pages HTTP 404 with SPA fallback HTML | Pass |
| Base href | `/angular21-erp-crm-shell/` | `/angular21-erp-crm-nx-monolith/` | Pass |
| App root | `<app-root>` served | `<app-root>` served | Pass |
| Static assets | Shell assets under shell base path | Monolith assets under monolith base path | Pass |

Note: GitHub Pages returns HTTP 404 for direct deep links when using the SPA `404.html` fallback pattern. This is expected as long as the fallback HTML boots Angular and the browser-side router resolves the route.

## Route Parity

| User route | MFE architecture | Nx monolith architecture | QA status |
|---|---|---|---|
| `/` | Shell dashboard component | App dashboard component | Pass |
| `/auth` | Shell auth placeholder | App auth placeholder | Pass |
| `/crm` | Shell loads CRM remote routes | App lazy-loads `@erp-crm/crm/feature` | Pass |
| `/crm/opportunities` | CRM remote child route | CRM feature child route | Pass |
| `/crm/customers` | CRM remote child route | CRM feature child route | Pass |
| `/crm/pipeline` | CRM remote child route | CRM feature child route | Pass |
| `/inventory` | Shell loads Inventory remote routes | App lazy-loads `@erp-crm/inventory/feature` | Pass |
| `/inventory/movements` | Inventory remote child route | Inventory feature child route | Pass |
| `/inventory/warehouses` | Inventory remote child route | Inventory feature child route | Pass |
| `/accounting` | Shell loads Accounting remote routes | App lazy-loads `@erp-crm/accounting/feature` | Pass |
| `/accounting/payments` | Accounting remote child route | Accounting feature child route | Pass |
| `/accounting/ledger` | Accounting remote child route | Accounting feature child route | Pass |

## Feature Surface Parity

| Area | Evidence | QA status |
|---|---|---|
| Sidebar | Same labels, order, icons, product name, active-link component behavior | Pass |
| Topbar | Same layout component; copy differs by architecture | Pass with copy variance |
| Dashboard KPIs | Same `shellKpis` records | Pass |
| Dashboard recent leads | Same CRM lead records and columns | Pass |
| Domain boundary card | Same navigational role; visible architecture copy differs | Pass with copy variance |
| CRM leads | Same rows, columns, badge/currency formatting | Pass |
| CRM opportunities | Same rows, columns, date/currency formatting | Pass |
| CRM customers | Same rows, columns, health badge mapping | Pass |
| CRM pipeline | Same stages, lead grouping, card layout | Pass |
| Inventory products | Same rows, columns, low-stock filter | Pass |
| Inventory movements | Same rows, columns, movement badges | Pass |
| Inventory warehouses | Same rows, columns, status badges | Pass |
| Accounting invoices | Same rows, columns, invoice status badges | Pass |
| Accounting payments | Same rows, columns, payment method data | Pass |
| Accounting ledger | Same rows, columns, note card behavior; final sentence differs by architecture | Pass with copy variance |
| Auth placeholder | Same card and scope message; final noun phrase differs by architecture | Pass with copy variance |
| Sales | Still represented through CRM opportunities and pipeline | Pass |
| HR | Still absent | Pass |

## Shared Code Parity

| Shared area | Result |
|---|---|
| Mock business records | Same CRM, inventory, accounting, KPI, and ledger records |
| Shared UI components | Same rendered behavior; differences are import alias changes only |
| Format utilities | Same functions; differences are import alias changes only |
| Shared models | Same business contracts; federation-only remote metadata replaced by monolith domain metadata |

## Architecture Difference Confirmed

| MFE | Nx monolith |
|---|---|
| Shell loads runtime remote routes | App lazy-loads local feature libraries |
| Uses remote definitions and Native Federation | Uses domain module definitions and static dynamic imports |
| Shell plus separately deployed remotes | One GitHub Pages app |
| Remote metadata includes `remoteEntry` details | Monolith metadata includes local feature library roles |

## Findings

| Severity | Finding | Recommendation |
|---|---|---|
| Low | Visible architecture copy differs between apps. Examples: "ERP/CRM Micro-Frontend Workspace" vs "ERP/CRM Monolith Workspace", "CRM remote" vs "CRM feature library". | Keep this if the article screenshots should visibly teach architecture. If strict screenshot parity is required, change both versions to neutral copy like "ERP/CRM Workspace", "CRM workspace", and "Domain boundaries". |
| Low | GitHub Pages deep links return HTTP 404 before Angular boots. | Accept for GitHub Pages SPA fallback, or document it clearly in README and the article. |

## QA Decision

Feature parity is accepted for implementation and article use.

For article screenshots, use the visible copy difference intentionally:

- Monolith screenshots show a modular Nx monolith.
- MFE screenshots show shell/remotes.
- Business screens, routes, data, and interactions remain aligned.

## Compact Checkpoint

Feature parity QA completed. Functional parity passes. Only architecture-specific visible text differs, and that should be treated as an article/storytelling decision rather than a functional gap.
