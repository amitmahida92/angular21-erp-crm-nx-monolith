# Final Architecture And Article Planning Document

## 1. Objective

`angular21-erp-crm-nx-monolith` is the Angular 21 Nx modular monolith version of the ERP/CRM demo. It is the "before" architecture for a Medium article about migrating from a clean Nx monolith to Angular 21 micro-frontends.

The monolith keeps the same user-facing routes, screens, mock data, and shared UI patterns as the existing MFE setup. The only intended difference is architecture.

## 2. Existing MFE Reference

| Role | Reference |
|---|---|
| Live demo | https://amitmahida92.github.io/angular21-erp-crm-shell/ |
| Shell host | https://github.com/amitmahida92/angular21-erp-crm-shell |
| CRM remote | https://github.com/amitmahida92/angular21-erp-crm-crm-app |
| Inventory remote | https://github.com/amitmahida92/angular21-erp-crm-inventory-app |
| Accounting remote | https://github.com/amitmahida92/angular21-erp-crm-accounting-app |
| Consolidated MFE workspace | https://github.com/amitmahida92/angular21-erp-crm-microfrontends |

The reference product surface includes shell layout, dashboard, CRM, Inventory, Accounting, auth placeholder, shared UI, shared mock data, and shared utilities.

## 3. New Nx Monolith Architecture

```text
one Nx workspace
  -> one deployable Angular app
    -> lazy-loaded local feature libraries
```

| Area | Decision |
|---|---|
| Angular | 21 |
| Workspace | Nx |
| App | `erp-crm` |
| Architecture | Modular monolith |
| Feature loading | Lazy-loaded local libraries |
| Deployment | GitHub Pages |
| Federation | Not used |
| Backend | Out of scope |

## 4. Folder Structure

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
docs
.github/workflows
```

## 5. Feature Parity Matrix

| Area | Existing MFE | Nx Monolith |
|---|---|---|
| Dashboard | `/` shell dashboard | `/` app dashboard |
| Auth | `/auth` placeholder | `/auth` placeholder |
| CRM leads | `/crm` | `/crm` |
| CRM opportunities | `/crm/opportunities` | `/crm/opportunities` |
| CRM customers | `/crm/customers` | `/crm/customers` |
| CRM pipeline | `/crm/pipeline` | `/crm/pipeline` |
| Sales | CRM opportunities/pipeline | CRM opportunities/pipeline |
| Inventory products | `/inventory` | `/inventory` |
| Inventory movements | `/inventory/movements` | `/inventory/movements` |
| Inventory warehouses | `/inventory/warehouses` | `/inventory/warehouses` |
| HR | Not present | Not present |
| Accounting invoices | `/accounting` | `/accounting` |
| Accounting payments | `/accounting/payments` | `/accounting/payments` |
| Accounting ledger | `/accounting/ledger` | `/accounting/ledger` |
| Shared UI | Shared UI package | `libs/shared/ui` |
| Mock data | `shared-core` | `libs/shared/data-access` |
| Deployment | Shell plus remotes | One GitHub Pages app |

## 6. Milestone Execution Plan

| Milestone | Goal | Acceptance |
|---|---|---|
| 1 | Create Nx workspace | Workspace has `nx.json`, `package.json`, app/libs folders |
| 2 | Add Angular app | `erp-crm` builds and serves |
| 3 | Add shared libraries | Shared UI, models, util, data-access available via aliases |
| 4 | Add feature libraries | CRM, Inventory, Accounting feature libs are lazy chunks |
| 5 | Build shell layout | Sidebar/topbar/content shell renders |
| 6 | Build navigation | Active states and route links work |
| 7 | Implement dashboard | Dashboard matches MFE experience |
| 8 | Implement CRM | CRM routes and data match MFE |
| 9 | Implement sales parity | Sales remains CRM opportunities/pipeline |
| 10 | Implement inventory | Inventory routes and data match MFE |
| 11 | Implement HR parity | HR remains intentionally absent |
| 12 | Implement accounting | Accounting routes and data match MFE |
| 13 | Add mock data layer | Mock records and formatters align |
| 14 | Configure routing | Local lazy routes work |
| 15 | Configure styling/theme | Visual parity retained |
| 16 | Configure GitHub Pages | Pages build uses monolith base href |
| 17 | Prepare README | Repo is article-ready |
| 18 | Final QA | Build/test/parity checklist pass |

## 7. Migration Mapping

| Nx monolith item | Micro-frontend item | Notes |
|---|---|---|
| `apps/erp-crm` | Shell host | Keep layout, dashboard, nav, fallback patterns |
| `libs/crm/feature` | CRM remote app | First extraction candidate |
| `libs/inventory/feature` | Inventory remote app | Extract after CRM pattern |
| `libs/accounting/feature` | Accounting remote app | Extract after shared contracts settle |
| `libs/shared/ui` | Shared UI package/library | Preserve visual parity |
| `libs/shared/models` | Shared contracts | Keep stable and version-aware |
| `libs/shared/util` | Shared utilities | Keep small |
| Local lazy route | Runtime remote route | Replace local import with remote loading |
| One deployment | Shell plus remote deployments | Trade simplicity for autonomy |

## 8. GitHub Pages Deployment Strategy

The monolith deploys as one GitHub Pages artifact.

```bash
npm run build:gh-pages
```

The build uses:

```text
baseHref: /angular21-erp-crm-nx-monolith/
deployUrl: /angular21-erp-crm-nx-monolith/
```

The workflow copies `index.html` to `404.html` so browser refreshes on app routes can fall back to the SPA.

## 9. README Structure

The README documents overview, live demo, reference repos, architecture, folder structure, routes, parity notes, local development, build commands, GitHub Pages deployment, migration story, and out-of-scope items.

## 10. Medium Article Outline

| Act | Title | Purpose |
|---|---|---|
| Act 1 | The Comfortable Nx Monolith | Show why the monolith is a good starting point |
| Act 2 | The ERP Starts Growing | Introduce team/release pressure |
| Act 3 | The First Architectural Crack | Explain independent deployment pressure |
| Act 4 | Drawing Domain Boundaries | Map CRM, Inventory, Accounting |
| Act 5 | Extracting the First Remote | Extract CRM first |
| Act 6 | Wiring Angular 21 Module Federation | Replace local lazy routes with remote routes |
| Act 7 | Independent Deployment | Show deployment payoff |
| Act 8 | Final Architecture | Compare before and after |
| Act 9 | Lessons Learned | Summarize tradeoffs |

Needed later: diagrams, screenshots, route snippets, federation snippets, deployment snippets, and before/after architecture comparison.

## 11. Risks And Trade-Offs

| Risk | Mitigation |
|---|---|
| Visual drift from MFE | Use feature parity screenshots during QA |
| Adding HR/Sales prematurely | Keep them out unless the MFE version expands too |
| Cross-domain imports | Use Nx project tags and path aliases |
| GitHub Pages route refresh | Ship SPA `404.html` fallback |
| MFE complexity appears unjustified | Anchor article around independent deployment and team ownership |
| Build tool instability | Keep app source builder-independent and document verified commands |

## 12. Final Implementation Checklist

- [x] Nx workspace metadata added.
- [x] Angular 21 app added.
- [x] CRM, Inventory, and Accounting feature libraries added.
- [x] Shared UI, models, util, and data-access libraries added.
- [x] Local lazy routes configured.
- [x] Federation removed from monolith source.
- [x] Dashboard, CRM, Inventory, Accounting, and auth placeholder implemented.
- [x] GitHub Pages workflow added.
- [x] README and planning docs added.
- [x] Production build verified.
- [x] GitHub Pages build verified.
- [x] Unit test target verified.
