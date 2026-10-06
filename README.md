# Copa America 2024 Archive

A static archive of all 32 completed Copa America 2024 matches and the final standings for 17 prediction entries. Built with Next.js, React, and Tailwind CSS.

## Run locally

```sh
npm ci
npm run dev
```

## Build and preview the static site

```sh
npm test
npm run lint
npm run build
npm start
```

Open http://127.0.0.1:3000. `npm start` serves only the exported files, including direct participant links and the 404 page. It is a local preview server.

## Deploy

Publish the contents of `out/` to a static web host. Build command: `npm run build`. Publish directory: `out`. No Next.js server, API key, environment variables, or runtime football API requests are required. Configure the host to serve directory `index.html` files and `404.html` for missing paths; do not use an SPA fallback. The export assumes deployment at the domain root.

Routes: `/`, participant pages `/1/` through `/17/`, and `/tool/`. The prediction tool is a browser-only calculator; it does not save submissions.

## Archived data

- `data/fixtures2024-final.json`: complete API-Football results retrieved via the project's previously configured RapidAPI integration.
- `data/archive-info.json`: source and capture timestamp (not the tournament date).
- `data/predictions-official.json`: original participant predictions.
- `lib/archive.ts`: validates the snapshot and calculates final scores during the build. Group picks follow the original entry tool's match pairings, independent of API ordering. The existing 39-point maximum and dense ranking rules are preserved.
- `public/images/teams/` and `public/fonts/`: locally stored team logos and fonts. Font licenses are included beside the font files.

The older fixture JSON files are historical inputs and are not used by the archive. To correct results, update the final snapshot, run the checks, rebuild, and republish `out/`. The build does not fetch data or fonts. Interactive stage filters still run in the browser.
