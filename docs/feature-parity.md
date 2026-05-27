# Feature Parity Matrix

Status legend:

- `Verified`: implemented in the monolith and covered by current source/build/test evidence.
- `Intentional`: intentionally absent or represented elsewhere to match the current MFE surface.

| Area | Existing MFE | Nx Monolith | QA Status |
|---|---|---|---|
| Root route | `/` shell dashboard | `/` app dashboard | Verified |
| Auth route | `/auth` placeholder | `/auth` placeholder | Verified |
| CRM leads | `/crm` | `/crm` | Verified |
| CRM opportunities | `/crm/opportunities` | `/crm/opportunities` | Verified |
| CRM customers | `/crm/customers` | `/crm/customers` | Verified |
| CRM pipeline | `/crm/pipeline` | `/crm/pipeline` | Verified |
| Sales | CRM opportunities/pipeline | CRM opportunities/pipeline | Intentional |
| Inventory products | `/inventory` | `/inventory` | Verified |
| Inventory movements | `/inventory/movements` | `/inventory/movements` | Verified |
| Inventory warehouses | `/inventory/warehouses` | `/inventory/warehouses` | Verified |
| HR | Not present | Not present | Intentional |
| Accounting invoices | `/accounting` | `/accounting` | Verified |
| Accounting payments | `/accounting/payments` | `/accounting/payments` | Verified |
| Accounting ledger | `/accounting/ledger` | `/accounting/ledger` | Verified |
| Shared components | Shared UI package | `libs/shared/ui` | Verified |
| Mock data/services | `shared-core` | `libs/shared/data-access` | Verified |
| GitHub Pages | Shell plus remotes | One monolith deployment | Verified |

Verification commands:

```bash
npm run build
npm run build:gh-pages
npm test
```
