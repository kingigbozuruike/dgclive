# DGC Live

A full-stack application with a Next.js frontend and Express/Prisma backend, powered by Supabase.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TailwindCSS 4 |
| Backend | Express.js, TypeScript, ts-node-dev |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma 6 |
| Auth | Supabase Auth |
| Package Manager | pnpm |

## Project Structure

```
dgclive/
├── apps/
│   ├── api/                 # Express backend
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── index.ts     # Entry point
│   │   │   ├── lib/
│   │   │   │   ├── prisma.ts
│   │   │   │   └── supabaseAdmin.ts
│   │   │   └── middleware/
│   │   │       └── requireAuth.ts
│   │   ├── .env             # Backend environment variables
│   │   └── package.json
│   │
│   └── web/                 # Next.js frontend
│       ├── app/
│       │   ├── lib/
│       │   │   └── supabase.ts
│       │   ├── page.tsx
│       │   └── test/
│       │       └── page.tsx # Connection test page
│       ├── .env.local       # Frontend environment variables
│       └── package.json
│
├── packages/
│   └── common/              # Shared code (if needed)
│
└── supabase/
    └── config.toml          # Supabase local config
```

## Prerequisites

- **Node.js** >= 18.18.0
- **pnpm** >= 9.x
- **Supabase account** with a project created

## Environment Setup

### 1. Backend (`apps/api/.env`)

Create `apps/api/.env` with:

```env
PORT=3001

# Supabase
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database (use session pooler for IPv4 compatibility)
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-1-eu-west-2.pooler.supabase.com:5432/postgres?pgbouncer=true&sslmode=require"
```

**Where to find these values:**
- **SUPABASE_URL**: Supabase Dashboard → Project Settings → API → Project URL
- **SUPABASE_SERVICE_ROLE_KEY**: Supabase Dashboard → Project Settings → API → `service_role` (keep secret!)
- **DATABASE_URL**: Supabase Dashboard → Project Settings → Database → Connection string → Session pooler (port 5432)

### 2. Frontend (`apps/web/.env.local`)

Create `apps/web/.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Where to find these values:**
- **NEXT_PUBLIC_SUPABASE_URL**: Same as SUPABASE_URL above
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Supabase Dashboard → Project Settings → API → `anon` public key

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd dgclive

# Install dependencies for both apps
cd apps/api && pnpm install
cd ../web && pnpm install

# Generate Prisma client (in apps/api)
cd ../api && pnpm exec prisma generate
```

## Running Development Servers

You need **two terminal windows**:

### Terminal 1 - Backend API
```bash
cd apps/api
pnpm dev
# Runs on http://localhost:3001
```

### Terminal 2 - Frontend Web
```bash
cd apps/web
pnpm dev
# Runs on http://localhost:3000
```

## Testing Connections

1. **Backend health check:**
   ```bash
   curl http://localhost:3001/health
   ```
   Expected: `{"ok":true,"now":[{"now":"2026-01-21T..."}]}`

2. **Frontend test page:**
   Open http://localhost:3000/test in your browser and click the test buttons.

## Database Migrations

```bash
cd apps/api

# Create a migration after schema changes
pnpm exec prisma migrate dev --name your_migration_name

# Push schema changes without migration (dev only)
pnpm exec prisma db push

# Open Prisma Studio to view data
pnpm exec prisma studio
```

## Troubleshooting

### Prisma migrate/push hangs
- **Cause**: Using transaction pooler (port 6543) instead of session pooler
- **Fix**: Use port `5432` with `?pgbouncer=true` in your DATABASE_URL

### "Cannot find module" errors
- **Cause**: Corrupted node_modules (often from iCloud sync)
- **Fix**: 
  ```bash
  rm -rf node_modules pnpm-lock.yaml
  pnpm install
  ```
- **Prevention**: Move project out of iCloud-synced folders (Desktop, Documents)

### Authentication failed against database
- **Cause**: Incorrect database password
- **Fix**: Reset password in Supabase Dashboard → Project Settings → Database

### Direct database connection fails (IPv6)
- **Cause**: Your network doesn't support IPv6
- **Fix**: Use session pooler URL (port 5432 on `pooler.supabase.com`) instead of direct connection

## Available Scripts

### Backend (`apps/api`)
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm exec prisma generate` | Generate Prisma client |
| `pnpm exec prisma migrate dev` | Run migrations |
| `pnpm exec prisma studio` | Open database GUI |

### Frontend (`apps/web`)
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test both frontend and backend
4. Submit a pull request

---

**Questions?** Reach out to the team lead.
