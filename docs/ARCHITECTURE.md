# Architecture Document

This document describes the technical architecture of Humanitarian HRMS.

---

## System Overview

Humanitarian HRMS is a modern web application built with a **JAMstack-inspired architecture**, combining server-rendered React components with a fully managed backend-as-a-service (Supabase).

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    Next.js Application                     │ │
│  │                                                           │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │ │
│  │  │Dashboard│  │  Staff  │  │Training │  │ Reports │    │ │
│  │  │  Page   │  │Directory│  │Programs │  │Analytics│    │ │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    │ │
│  │       │            │            │            │          │ │
│  │  ┌────┴────────────┴────────────┴────────────┴────┐     │ │
│  │  │              Shared Components                  │     │ │
│  │  │  Sidebar │ Header │ Cards │ Tables │ Charts    │     │ │
│  │  └────────────────────┬───────────────────────────┘     │ │
│  │                       │                                  │ │
│  │  ┌────────────────────┴───────────────────────────┐     │ │
│  │  │              Data Layer (lib/)                  │     │ │
│  │  │  mockData.ts │ supabase.ts │ utils.ts          │     │ │
│  │  └────────────────────┬───────────────────────────┘     │ │
│  └───────────────────────┼───────────────────────────────────┘ │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           │ HTTPS / WebSocket
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                     SUPABASE                                    │
│                          │                                      │
│  ┌───────────────────────┼───────────────────────────────────┐ │
│  │              API Gateway (PostgREST)                       │ │
│  │                       │                                    │ │
│  │  ┌────────────────────┼────────────────────────────────┐  │ │
│  │  │         Row Level Security (RLS)                     │  │ │
│  │  │                    │                                │  │ │
│  │  │  ┌────────┐  ┌────┴────┐  ┌─────────┐  ┌───────┐  │  │ │
│  │  │  │  Auth  │  │Database │  │ Realtime │  │Storage│  │  │ │
│  │  │  │(GoTrue)│  │(PgSQL)  │  │ (WebSkt) │  │ (S3)  │  │  │ │
│  │  │  └────────┘  └─────────┘  └─────────┘  └───────┘  │  │ │
│  │  └────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Framework: Next.js App Router

The application uses Next.js with the **App Router** (introduced in Next.js 13+), providing:

- **Server Components** — Default server-side rendering for better performance
- **Client Components** — Interactive components marked with `'use client'`
- **File-based Routing** — Pages map directly to URL paths
- **Layouts** — Shared UI (sidebar, header) wraps all pages
- **Streaming** — Progressive page loading with Suspense

### Routing Structure

```
src/app/
├── layout.tsx          → Root layout (sidebar + header)
├── page.tsx            → / (Dashboard)
├── login/
│   └── page.tsx        → /login (Authentication)
├── staff/
│   ├── page.tsx        → /staff (Staff Directory)
│   └── [id]/
│       └── page.tsx    → /staff/:id (Staff Profile)
├── training/
│   ├── page.tsx        → /training (Training Programs)
│   └── [id]/
│       └── page.tsx    → /training/:id (Training Detail)
└── reports/
    └── page.tsx        → /reports (Reports & Analytics)
```

### Component Architecture

```
Components
├── Layout Components
│   ├── Sidebar          → Navigation sidebar with collapse
│   └── Header           → Top bar with search and user info
│
├── Page Components
│   ├── Dashboard        → Stats, charts, activity feed
│   ├── StaffDirectory   → Searchable staff grid
│   ├── StaffProfile     → Employee detail view
│   ├── TrainingList     → Training program cards
│   ├── TrainingDetail   → Program detail with enrollments
│   └── Reports          → Analytics and charts
│
└── Shared Components
    ├── StatCard         → Metric display card
    ├── StatusBadge      → Colored status indicator
    ├── SearchInput      → Search with icon
    ├── FilterTabs       → Tab-based filters
    ├── ProgressBar      → Completion progress
    ├── BarChart         → Simple bar visualization
    └── DonutChart       → Donut/pie visualization
```

### State Management

The application uses **React's built-in state management**:

- `useState` — Local component state (search, filters, modals)
- `useMemo` — Computed/derived state (filtered lists)
- `useParams` — URL parameters (staff ID, program ID)
- `usePathname` — Current route (active nav item)

No external state management library is needed due to the application's moderate complexity.

---

## Backend Architecture

### Supabase Services

| Service | Purpose | Technology |
|---|---|---|
| **Database** | Persistent data storage | PostgreSQL 15 |
| **Auth** | User authentication | GoTrue |
| **Realtime** | Live data subscriptions | WebSocket server |
| **Storage** | File uploads (avatars, docs) | S3-compatible |
| **Edge Functions** | Serverless compute | Deno runtime |

### Database Design Principles

1. **Normalization** — Data is normalized to 3NF to minimize redundancy
2. **Referential Integrity** — Foreign keys enforce relationships
3. **ENUM Types** — Constrained value sets for status fields
4. **Timestamps** — `created_at` and `updated_at` on all tables
5. **UUID Primary Keys** — Globally unique, non-sequential IDs
6. **Soft Deletes** — Status-based rather than physical deletion

### Row Level Security (RLS)

All tables have RLS enabled. The security model follows the principle of **least privilege**:

```
User Role     │ Read Staff │ Read Training │ Write Staff │ Write Training │ Read Reviews
──────────────┼────────────┼───────────────┼─────────────┼────────────────┼─────────────
Admin         │     ✓      │       ✓       │      ✓      │       ✓        │      ✓
Manager       │     ✓      │       ✓       │      ✗      │       ✓        │      ✓
Staff         │     ✓      │       ✓       │      ✗      │       ✗        │   Own only
```

### Data Flow

```
User Action → React Component → Supabase Client → PostgREST API
                                                         │
                                                         ▼
                                                  RLS Policy Check
                                                         │
                                                         ▼
                                                  PostgreSQL Query
                                                         │
                                                         ▼
                                                  Response → Component → UI Update
```

---

## Data Layer

### Mock Data (`lib/mockData.ts`)

In demo mode, the application uses pre-seeded mock data. This file contains:

- **TypeScript interfaces** — Type definitions for all entities
- **Sample data** — Realistic NGO data (18 staff, 8 programs, etc.)
- **Helper functions** — Query functions that simulate API calls
- **Computed stats** — Dashboard metrics calculated from mock data

### Supabase Client (`lib/supabase.ts`)

When connected to Supabase, this module provides:

```typescript
// Client initialization
const supabase = createClient(url, anonKey)

// Type-safe queries
const { data, error } = await supabase
  .from('staff_profiles')
  .select('*, departments(name)')
  .eq('status', 'active')

// Real-time subscriptions
supabase.channel('changes')
  .on('postgres_changes', { event: '*', table: 'staff_profiles' }, handler)
  .subscribe()
```

---

## Styling Architecture

### Tailwind CSS

All styling uses **Tailwind CSS utility classes**. The design system is defined through:

1. **CSS Variables** (`globals.css`) — Base color tokens
2. **Tailwind Config** (`tailwind.config.ts`) — Extended theme
3. **Component Patterns** — Consistent class combinations

### Design Tokens

```css
:root {
  --primary: #2563eb;      /* Blue-600 */
  --primary-dark: #1d4ed8; /* Blue-700 */
  --success: #16a34a;      /* Green-600 */
  --warning: #d97706;      /* Amber-600 */
  --danger: #dc2626;       /* Red-600 */
  --sidebar-bg: #0f172a;   /* Slate-900 */
}
```

### Status Colors

| Status | Background | Text | Usage |
|---|---|---|---|
| Active | `bg-emerald-50` | `text-emerald-700` | Active staff, active programs |
| On Leave | `bg-amber-50` | `text-amber-700` | Staff on leave |
| Inactive | `bg-slate-50` | `text-slate-500` | Inactive staff |
| Contractor | `bg-blue-50` | `text-blue-700` | Contract workers |
| Completed | `bg-emerald-50` | `text-emerald-700` | Completed training |
| In Progress | `bg-amber-50` | `text-amber-700` | Ongoing training |
| Enrolled | `bg-blue-50` | `text-blue-700` | New enrollment |
| Draft | `bg-slate-50` | `text-slate-500` | Draft programs |

---

## Performance Considerations

### Current Optimizations

1. **Server Components** — Default server rendering reduces client JS bundle
2. **useMemo** — Expensive computations (filtering, sorting) are memoized
3. **Lazy Loading** — Charts and heavy components load on demand
4. **Image Optimization** — Next.js Image component for avatars
5. **Font Optimization** — Google Fonts loaded via `<link>` in head

### Future Optimizations

1. **Database Indexing** — Indexes on frequently queried columns
2. **Connection Pooling** — Supabase PgBouncer for high concurrency
3. **Caching** — React Query or SWR for API response caching
4. **CDN** — Static assets served via Vercel Edge Network
5. **Pagination** — Server-side pagination for large datasets

---

## Security Architecture

### Authentication Flow

```
User → Login Page → Supabase Auth (OAuth/Email)
                          │
                          ▼
                    JWT Token Generated
                          │
                          ▼
                    Stored in HTTP-only Cookie
                          │
                          ▼
                    Sent with every request
                          │
                          ▼
                    Verified by RLS Policies
```

### Data Protection

1. **RLS Policies** — Database-level access control
2. **API Key Separation** — Anon key (client) vs. service role (server)
3. **HTTPS Only** — All communication encrypted in transit
4. **Environment Variables** — Secrets never committed to code
5. **Input Validation** — Server-side validation via PostgreSQL constraints

---

## Scalability

### Current Capacity

- **Supabase Free Tier**: 500MB database, 1GB file storage, 50K MAU
- **Supabase Pro**: 8GB database, 100GB file storage, unlimited MAU
- **Vercel**: 100GB bandwidth, serverless functions

### Scaling Path

| Users | Recommendation |
|---|---|
| 1-50 | Supabase Free + Vercel Free |
| 50-500 | Supabase Pro ($25/mo) + Vercel Pro ($20/mo) |
| 500-5000 | Supabase Team + Vercel Enterprise |
| 5000+ | Self-hosted Supabase + Custom infrastructure |

---

## Technology Decisions

| Decision | Rationale |
|---|---|
| **Next.js** over CRA | Server components, better SEO, built-in optimization |
| **Supabase** over Firebase | SQL database, open source, self-hostable |
| **Tailwind** over CSS Modules | Faster development, consistent design system |
| **TypeScript** over JavaScript | Type safety, better IDE support, fewer bugs |
| **Mock Data** for demo | Instant demo without Supabase setup |
| **SVG Charts** over Chart.js | Smaller bundle, custom styling, no external dependency |

---

For more details, see the [API Documentation](./API.md) and [Deployment Guide](./DEPLOYMENT.md).