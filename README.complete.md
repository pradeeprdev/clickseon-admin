# Clickseon — Admin Dashboard (clickseon-admin)

Admin dashboard for Clickseon: a Next.js (App Router) admin interface to manage leads, users, and analytics.

## Quick summary
- Framework: Next.js
- Language: TypeScript
- Key folders: `app/`, `components/`, `layout/`, `services/`, `hooks/`, `middleware/`

## Prerequisites
- Node.js 18+ recommended
- npm, yarn or pnpm
- A running Clickseon API (clickseon-server) or a reachable API URL

## Setup & run (local)
1. Install dependencies

```bash
cd clickseon-admin
npm install
```

2. Create `.env.local` (example values):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Add any other keys your environment requires
```

3. Start in development mode

```bash
npm run dev
# Visit http://localhost:3000
```

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm start` — start production server (after `build`)

## Important folders
- `app/` — Next.js routes and pages
- `components/` — shared UI components (dashboard widgets, forms)
- `layout/` — site shell and layout components
- `services/` — API clients and wrappers (`api.ts`, `authService.ts`, `leadService.ts`)
- `hooks/` — custom React hooks (e.g., `useAuth`)
- `middleware/` — route guards and request middleware

## API contract & integration notes
The frontend calls the REST API under `NEXT_PUBLIC_API_URL`. Expected endpoints include `/auth`, `/leads`, `/dashboard`, `/chat`, and related routes — see the server's `src/routes` for exact paths and payloads.

## Deployment
Recommended: Vercel. Ensure `NEXT_PUBLIC_API_URL` is set in the environment variables for the deployment.

## Contributing
Create a branch, add tests for non-trivial logic, open a PR and request reviews.

## Contact
For issues or questions open an issue in this repo or contact the project maintainer.
