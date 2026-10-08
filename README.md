# Humanitarian HRMS

**Personnel & Training Management System for NGOs**

A modern, full-stack web application built with Next.js and Supabase, designed to help humanitarian organizations manage their workforce, track training programs, ensure compliance, and maintain operational readiness across global field offices.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Pages & Components](#pages--components)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Humanitarian organizations operate in complex, distributed environments with staff spread across multiple countries and time zones. Managing personnel records, tracking mandatory training compliance, and ensuring field readiness is critical — yet many NGOs still rely on spreadsheets and disconnected tools.

**Humanitarian HRMS** solves this by providing a centralized platform for:

- **Personnel Management** — Maintain a searchable directory of all staff, contractors, and volunteers across field offices worldwide
- **Training Management** — Create, manage, and track training programs with enrollment, completion, and scoring
- **Compliance Tracking** — Monitor mandatory training requirements, certification expiry dates, and regulatory compliance
- **Analytics & Reporting** — Gain organizational insights through dashboards, charts, and exportable reports

### Who Is This For?

- NGO Operations Directors managing dispersed teams
- HR Coordinators tracking staff development and compliance
- Program Managers overseeing training delivery
- Country Directors needing real-time workforce visibility
- Donor reporting teams requiring compliance documentation

---

## Features

### Personnel Management
- Global staff directory with search, filter, and sort
- Employee profiles with contact info, department, position, and location
- Status tracking: Active, On Leave, Contractor, Inactive
- Role-based access: Admin, Manager, Staff
- Department and geographic organization

### Training Programs
- Create and manage training programs with categories
- Track enrollment, progress, and completion
- Score tracking and certification issuance
- Mandatory vs. optional training flags
- Instructor and location management

### Compliance & Certifications
- Certification tracking with expiry dates
- Automated alerts for expiring certifications (90-day window)
- Mandatory training compliance rates
- Per-program compliance dashboards

### Analytics & Reporting
- Executive dashboard with key metrics
- Staff distribution by department and country
- Training completion rates by category
- Role and status composition charts
- Geographic presence visualization
- Exportable reports

### Real-Time (When Connected to Supabase)
- Live updates when staff records change
- Real-time training enrollment notifications
- Instant search across all records

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 (App Router) | React framework with server components |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Icons** | Lucide React | Lightweight icon library |
| **Charts** | Custom SVG + Recharts | Data visualization |
| **Backend** | Supabase | PostgreSQL database, Auth, Realtime, Storage |
| **Language** | TypeScript | Type-safe development |
| **Deployment** | Vercel | Frontend hosting and serverless functions |

### Why Supabase?

- **PostgreSQL** — Industry-standard relational database with full SQL support
- **Row Level Security** — Fine-grained access control at the database level
- **Realtime** — WebSocket subscriptions for live data updates
- **Auth** — Built-in authentication with OAuth providers
- **Auto-generated APIs** — RESTful APIs generated from your schema
- **Open Source** — Self-hostable if needed

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  Next.js App Router + Tailwind CSS + Lucide Icons           │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │  Staff   │  │Training  │  │ Reports  │   │
│  │  Page    │  │Directory │  │Programs  │  │Analytics │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Supabase Client Library                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase                               │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │PostgreSQL│  │   Auth   │  │ Realtime │  │ Storage  │   │
│  │ Database │  │ (GoTrue) │  │ (WebSkt) │  │  (S3)    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │             Row Level Security (RLS)                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9 or later
- **Supabase account** (free tier works) — [supabase.com](https://supabase.com)

### Quick Start (Demo Mode)

The project includes pre-seeded mock data, so you can run it immediately without a Supabase connection:

```bash
# Clone or download the project
cd ngo-hrms

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Full Setup (With Supabase)

#### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Choose an organization, enter a project name and database password
4. Select a region close to your users
5. Wait ~2 minutes for provisioning

#### Step 2: Set Up the Database

1. Go to the **SQL Editor** in your Supabase dashboard
2. Open `supabase/schema.sql` from this project
3. Copy and paste the entire contents into the SQL Editor
4. Click **Run** to create all tables and policies

#### Step 3: Seed Sample Data (Optional)

1. In the SQL Editor, open `supabase/seed.sql`
2. Copy and paste the contents
3. Click **Run** to populate sample data

#### Step 4: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service role key for admin operations (server-side only)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Find these values in your Supabase dashboard under **Settings → API**.

#### Step 5: Connect the Frontend

Update the Supabase client initialization in `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### Step 6: Start Development

```bash
npm run dev
```

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────────────┐       ┌──────────────────┐
│   departments    │       │  staff_profiles   │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │◄──┐   │ id (PK)          │
│ name             │   │   │ user_id (FK)     │──► auth.users
│ description      │   │   │ employee_id      │
│ head_id (FK) ────│───┘───│ department_id(FK)│
│ created_at       │       │ first_name       │
│ updated_at       │       │ last_name        │
└──────────────────┘       │ email            │
                           │ role             │
                           │ status           │
                           │ position         │
                           │ location         │
                           │ country          │
                           │ hire_date        │
                           └────────┬─────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
    ┌───────────────────┐ ┌──────────────┐ ┌──────────────────┐
    │training_enrollments│ │certifications│ │performance_reviews│
    ├───────────────────┤ ├──────────────┤ ├──────────────────┤
    │ id (PK)           │ │ id (PK)      │ │ id (PK)          │
    │ staff_id (FK)     │ │ staff_id(FK) │ │ staff_id (FK)    │
    │ program_id (FK)───│─│ name         │ │ reviewer_id (FK) │
    │ status            │ │ issuing_body │ │ review_period_*  │
    │ enrolled_at       │ │ issued_date  │ │ overall_rating   │
    │ completed_at      │ │ expiry_date  │ │ strengths        │
    │ score             │ │ is_active    │ │ goals            │
    └───────────────────┘ └──────────────┘ └──────────────────┘
                    │
                    ▼
    ┌───────────────────┐
    │training_programs  │
    ├───────────────────┤
    │ id (PK)           │
    │ title             │
    │ description       │
    │ category          │
    │ status            │
    │ duration_hours    │
    │ is_mandatory      │
    │ certification_name│
    │ start_date        │
    │ end_date          │
    └───────────────────┘
```

### Tables

| Table | Description | Key Fields |
|---|---|---|
| `departments` | Organizational departments | `name`, `head_id` |
| `staff_profiles` | Employee records | `employee_id`, `role`, `status`, `department_id` |
| `training_programs` | Training course catalog | `title`, `category`, `status`, `is_mandatory` |
| `training_enrollments` | Staff-program assignments | `staff_id`, `program_id`, `status`, `score` |
| `certifications` | Professional certifications | `staff_id`, `name`, `expiry_date`, `is_active` |
| `performance_reviews` | Performance evaluations | `staff_id`, `reviewer_id`, `overall_rating` |

### Enums

| Enum | Values |
|---|---|
| `staff_role` | `admin`, `manager`, `staff` |
| `staff_status` | `active`, `on_leave`, `inactive`, `contractor` |
| `training_status` | `draft`, `active`, `completed`, `archived` |
| `enrollment_status` | `enrolled`, `in_progress`, `completed`, `dropped` |

### Row Level Security Policies

All tables have RLS enabled. Policies are configured for:

- **Authenticated read access** — All authenticated users can view staff, departments, and training data
- **Self-restricted reviews** — Staff can only view their own performance reviews
- **Admin write access** — Extend with custom policies for admin/manager roles

---

## Project Structure

```
ngo-hrms/
├── public/                          # Static assets
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout with sidebar + header
│   │   ├── page.tsx                 # Dashboard (home page)
│   │   ├── globals.css              # Global styles + Tailwind imports
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── staff/
│   │   │   ├── page.tsx             # Staff directory (card grid)
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Individual staff profile
│   │   ├── training/
│   │   │   ├── page.tsx             # Training programs list
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Individual program detail
│   │   └── reports/
│   │       └── page.tsx             # Reports & analytics dashboard
│   ├── components/                  # Reusable UI components
│   │   └── Sidebar.tsx              # Navigation sidebar
│   └── lib/                         # Shared utilities
│       └── mockData.ts              # Mock data for demo mode
├── supabase/                        # Database configuration
│   ├── schema.sql                   # Complete database schema
│   └── seed.sql                     # Sample data for development
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
└── README.md                        # This file
```

---

## Pages & Components

### Dashboard (`/`)
The main landing page providing an executive overview:
- **Stat Cards** — Total staff, active programs, completion rate, compliance alerts
- **Department Distribution** — Bar chart of staff by department
- **Geographic Presence** — Staff distribution across countries
- **Training by Category** — Progress bars showing completion rates
- **Mandatory Compliance** — Required training completion status
- **Recent Activity** — Latest enrollments and status changes
- **Quick Actions** — Shortcut buttons for common tasks

### Staff Directory (`/staff`)
A searchable, filterable directory of all personnel:
- **Search** — By name, email, position, or employee ID
- **Status Filter** — All, Active, On Leave, Inactive, Contractor
- **Department Filter** — Filter by organizational department
- **Card Layout** — Each staff member displayed as an info card
- **Click-through** — Cards link to individual staff profiles

### Staff Profile (`/staff/[id]`)
Detailed view of an individual staff member:
- **Profile Header** — Name, role, status, position
- **Contact Information** — Email, phone, location, department
- **Training Summary** — Enrolled, completed, in progress, average score
- **Certifications** — Active certifications with expiry tracking
- **Training History** — Complete list of all training enrollments with scores

### Training Programs (`/training`)
Browse and manage training programs:
- **Category Filter** — Security, Compliance, Technical, Finance, M&E, Operations
- **Status Filter** — All, Active, Completed, Draft
- **Search** — By program title or description
- **Program Cards** — Rich cards showing status, progress, dates, instructor
- **Mandatory Flag** — Visual indicator for required training

### Training Detail (`/training/[id]`)
Full view of a specific training program:
- **Program Info** — Title, description, duration, location, dates, instructor
- **Enrollment Stats** — Total enrolled, completed, completion rate, average score
- **Participant List** — All enrolled staff with status and scores
- **Certification Info** — Associated certification details

### Reports & Analytics (`/reports`)
Comprehensive organizational analytics:
- **Key Metrics** — Staff count, active programs, completion rates, alerts
- **Staff by Department** — Horizontal bar chart
- **Staff Composition** — Donut charts for status and role distribution
- **Training by Category** — Enrolled vs. completed comparison
- **Geographic Presence** — Country distribution
- **Mandatory Compliance** — Per-program compliance rates
- **Certification Alerts** — Expiring and expired certifications

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes* | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes* | Your Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Service role key for admin operations |

*Required only when connecting to a live Supabase instance. The app runs in demo mode with mock data if these are not set.

### Next.js Configuration

The `next.config.ts` file includes:
- Turbopack with Tailwind CSS loader
- Cache Components enabled
- Partial Prefetching enabled

### Tailwind CSS

Custom design tokens are defined in `globals.css`:
- `--primary: #2563eb` — Primary blue
- `--sidebar-bg: #0f172a` — Dark sidebar background
- `--success: #16a34a` — Green for success states
- `--warning: #d97706` — Amber for warnings
- `--danger: #dc2626` — Red for errors/alerts

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **New Project** and import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

Vercel will automatically detect Next.js and configure the build.

### Deploy with Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

```bash
docker build -t ngo-hrms .
docker run -p 3000:3000 ngo-hrms
```

### Deploy to Self-Hosted

```bash
# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`.

---

## API Reference

When connected to Supabase, the following auto-generated REST endpoints are available:

### Staff Profiles

| Method | Endpoint | Description |
|---|---|---|
| GET | `/rest/v1/staff_profiles` | List all staff |
| GET | `/rest/v1/staff_profiles?id=eq.{id}` | Get staff by ID |
| POST | `/rest/v1/staff_profiles` | Create new staff |
| PATCH | `/rest/v1/staff_profiles?id=eq.{id}` | Update staff |
| DELETE | `/rest/v1/staff_profiles?id=eq.{id}` | Delete staff |

### Training Programs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/rest/v1/training_programs` | List all programs |
| GET | `/rest/v1/training_programs?id=eq.{id}` | Get program by ID |
| POST | `/rest/v1/training_programs` | Create new program |
| PATCH | `/rest/v1/training_programs?id=eq.{id}` | Update program |

### Enrollments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/rest/v1/training_enrollments` | List all enrollments |
| GET | `/rest/v1/training_enrollments?staff_id=eq.{id}` | Get staff enrollments |
| POST | `/rest/v1/training_enrollments` | Enroll staff in program |
| PATCH | `/rest/v1/training_enrollments?id=eq.{id}` | Update enrollment |

### Example Client Usage

```typescript
import { supabase } from '@/lib/supabase'

// Fetch all active staff
const { data: staff, error } = await supabase
  .from('staff_profiles')
  .select('*, departments(name)')
  .eq('status', 'active')
  .order('last_name')

// Enroll a staff member
const { data, error } = await supabase
  .from('training_enrollments')
  .insert({
    staff_id: 'staff-uuid',
    program_id: 'program-uuid',
    status: 'enrolled'
  })

// Subscribe to real-time changes
supabase
  .channel('enrollments')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'training_enrollments' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe()
```

---

## Roadmap

### Phase 1 — Core Platform ✅
- [x] Staff directory with search and filters
- [x] Training program management
- [x] Enrollment and completion tracking
- [x] Dashboard with key metrics
- [x] Reports and analytics
- [x] Mock data for demo

### Phase 2 — Supabase Integration
- [ ] Connect to live Supabase database
- [ ] Implement Supabase Auth with OAuth providers
- [ ] Add Row Level Security policies
- [ ] Real-time updates via Supabase subscriptions
- [ ] File storage for documents and certificates

### Phase 3 — Advanced Features
- [ ] Performance review management
- [ ] Leave management system
- [ ] Email notifications for expiring certifications
- [ ] Bulk import/export (CSV, Excel)
- [ ] Advanced search with filters and sorting
- [ ] Audit trail and activity logging

### Phase 4 — Enterprise
- [ ] Multi-tenant support (multiple organizations)
- [ ] SSO/SAML integration
- [ ] Custom report builder
- [ ] API webhooks for integrations
- [ ] Mobile app (React Native)
- [ ] Offline support for field operations

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Open a Pull Request

### Code Style

- TypeScript for all new code
- Tailwind CSS for styling (no custom CSS unless necessary)
- Lucide React for icons
- Follow existing component patterns

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org) — The React Framework
- [Supabase](https://supabase.com) — Open Source Firebase Alternative
- [Tailwind CSS](https://tailwindcss.com) — Utility-First CSS Framework
- [Lucide](https://lucide.dev) — Beautiful Icons
- [Vercel](https://vercel.com) — Deployment Platform

---

## Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the [documentation](https://supabase.com/docs)
- Join the [Supabase Discord](https://discord.supabase.com)

---

**Built for humanitarian organizations making a difference worldwide.**