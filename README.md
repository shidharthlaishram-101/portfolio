# Portfolio

Personal portfolio project showcasing Android & iOS development, web/app full-stack engineering, and design work.

Built with Vite + React for the frontend and a small Node.js server in the `server/` folder.

## Features

- Responsive single-page portfolio UI
- Vite + React frontend (see `src/`)
- Optional Node.js server (see `server/`)

## Tech stack

- Frontend: Vite, React
- Server: Node.js (Express or lightweight server in `server/index.js`)

## Quick Start

1. Install dependencies (root):

```bash
npm install
```

2. Start the frontend dev server:

```bash
npm run dev
```

3. If the server is used, install and run it separately:

```bash
cd server
npm install
npm run dev # or npm start
```

## Build for production

```bash
npm run build
# preview the production build
npm run preview
```

Note: Exact script names may vary — check the `scripts` section in `package.json`.

## Project structure

- `index.html` — Vite entry
- `src/` — React source files (entry: `main.jsx`, app: `App.jsx`)
- `public/` — static assets
- `server/` — Node.js server and its own `package.json`

## Contributing

PRs and issues are welcome. For local changes, follow the Quick Start steps above.

## License

This project is licensed under the MIT License — see the `LICENSE` file in the project root.

The `LICENSE` file includes `YEAR` and `FULL_NAME` placeholders; replace them with the appropriate copyright year and owner (for example: `2026 Jane Doe`). If you prefer a different license, tell me and I will update it.

## Contact

If you want help running or extending this project, tell me what you'd like to do next.
