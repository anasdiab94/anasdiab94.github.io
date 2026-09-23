# anasdiab site

A static personal site built with Astro and Tailwind. All copy lives in `src/content/`; nothing about the site is decided in component files. The plan is in `PLAN.md` (git-ignored, local only) and every fact comes from `_private/CONTENT_SOURCE.md` (git-ignored, never published).

## Run it locally

```
npm install
npm run dev
```

Open the address the terminal prints (normally http://localhost:4321).

## Preview on a phone

```
npx astro dev --host
```

Allow Node.js through Windows Defender Firewall on private networks when asked. With the phone on the same Wi-Fi, open `http://<laptop-ip>:4321` (the terminal prints the address).

## Check and build

```
npx astro check
npm run build
```

Today the build runs `astro build` alone, plus the Zod schemas in `src/lib/site.ts` and `src/content.config.ts`. From Session 2 of `PLAN.md` the build also runs `scripts/check-site.mjs` before and after, and fails, naming the file, if any content check fails (word counts, forbidden figures, stray links, organization names outside the fact-sheet timeline). Fix the content, not the check.

## Change text

- Main-page strings (cover line, ledger, labels): `src/content/site.json`.
- One sheet of work: its file in `src/content/cases/` (from Session 3).
- The how-I-think page: `src/content/how-i-think.md` (from Session 3).

Edit, save, run `npm run build`, redeploy.

## Redeploy

The site is published from this repository by `.github/workflows/deploy.yml` on every push to `main`.

1. `git add -A`
2. `git commit -m "Describe the change"`
3. `git push`

GitHub Actions builds and publishes the site in about a minute; watch the Actions tab go green, or run `gh run watch`. The live address is the one set as `site` in `astro.config.mjs`.

## Rules that never change

- Never commit anything under `_private/`, `docs/` or `PLAN.md`; `.gitignore` already excludes them. Confirm with `git status` before the first commit of a session.
- Never commit a real organization name from the term list anywhere except the `org` fields of the fact-sheet rows in `site.json` (named variant). To test the naming check, use the canary line, never a real name.
- Every number on the site comes from `_private/CONTENT_SOURCE.md` section 4.
