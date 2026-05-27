# Migration Mapping

| Nx monolith item | Micro-frontend item | Migration notes |
|---|---|---|
| `apps/erp-crm` | `angular21-erp-crm-shell` | Keep layout, dashboard, auth placeholder, navigation, and fallback UI |
| `libs/crm/feature` | `angular21-erp-crm-crm-app` | Extract first; exposes CRM routes |
| `libs/inventory/feature` | `angular21-erp-crm-inventory-app` | Extract after CRM pattern is stable |
| `libs/accounting/feature` | `angular21-erp-crm-accounting-app` | Extract after shared contracts are stable |
| `libs/shared/ui` | Shared UI package/library | Keep visual parity across host and remotes |
| `libs/shared/models` | Shared contracts | Keep stable and version-aware |
| `libs/shared/util` | Shared utilities | Keep small and framework-light |
| Local lazy route | Runtime remote route | Replace dynamic local imports with federation loading |
| Single Pages deployment | Shell and remote Pages deployments | Each remote gets its own build/deploy lifecycle |

## Before

```text
App route -> lazy-loaded local feature library
```

## After

```text
Shell route -> remote entry -> remote route definitions
```
