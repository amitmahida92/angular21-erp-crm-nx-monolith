# Publish Checklist

Use this checklist after GitHub CLI authentication is refreshed for `amitmahida92`.

## Current Local State

- Local repo path: `/Users/amitm/Documents/angular-mfe/angular21-erp-crm-nx-monolith`
- Branch: `main`
- Intended GitHub repo: `amitmahida92/angular21-erp-crm-nx-monolith`
- Intended Pages URL: `https://amitmahida92.github.io/angular21-erp-crm-nx-monolith/`

## Authenticate GitHub CLI

```bash
gh auth login -h github.com
gh auth status
```

## Create And Push Repo

If the GitHub repository does not exist yet:

```bash
gh repo create amitmahida92/angular21-erp-crm-nx-monolith --public --source=. --remote=origin --push
```

If the GitHub repository already exists:

```bash
git remote add origin https://github.com/amitmahida92/angular21-erp-crm-nx-monolith.git
git push -u origin main
```

## Enable GitHub Pages

The repository already includes `.github/workflows/deploy.yml`, which deploys with GitHub Actions.

In GitHub:

1. Open repository settings.
2. Go to `Pages`.
3. Set source to `GitHub Actions`.
4. Run the `Deploy Angular 21 Nx Monolith` workflow if it does not run automatically.

If the first workflow run fails with:

```text
Create Pages site failed. Error: Resource not accessible by integration
```

then GitHub Pages still needs to be enabled once by a repository admin. After the source is set to `GitHub Actions`, rerun the workflow.

## Verify

```bash
npm ci
npm run build:gh-pages
npm test
```

After the workflow completes, verify:

- Root route loads at `https://amitmahida92.github.io/angular21-erp-crm-nx-monolith/`
- Deep links refresh correctly, including `/crm`, `/inventory`, and `/accounting`
- Lazy chunks load from `/angular21-erp-crm-nx-monolith/`
