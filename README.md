# Rows

Rows is a Preact and TypeScript demo for comparing plain and virtualized tables. Both tables display symbols and prices from the same set of 50,000 sample instruments generated locally.

## Run locally

Install pnpm and Node.js 22.12 or later. Node.js 20.x also works starting at 20.19. Run these commands from the project root.

```sh
pnpm install
pnpm dev
```

Open the URL printed by Vite, usually [http://localhost:5173](http://localhost:5173).

## Pages

Use the header to switch between the three pages. Routing uses `preact-iso`.

| Route | What it shows |
| --- | --- |
| `/` | Home page with the table examples heading. |
| `/plain-table` | Watchlist that renders all 50,000 rows at once. |
| `/virtualized-table` | The same watchlist, rendering only rows in and just outside the visible area as you scroll. |

## Production build

Run `pnpm build` to type-check the app and create the production build in `dist/`. Run `pnpm preview` to serve that build locally.
