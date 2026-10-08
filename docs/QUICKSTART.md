# Quick Start Guide

Get Humanitarian HRMS running in under 5 minutes.

---

## Option 1: Demo Mode (No Setup Required)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

That's it! The app runs with pre-seeded mock data.

---

## Option 2: With Supabase (Full Setup)

### Step 1: Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up → New Project
2. Wait for provisioning (~2 min)
3. Go to **Settings → API** — copy your URL and anon key

### Step 2: Set Up Database (1 min)

1. In Supabase dashboard → **SQL Editor** → **New Query**
2. Paste contents of `supabase/schema.sql` → **Run**
3. Paste contents of `supabase/seed.sql` → **Run**

### Step 3: Connect App (1 min)

```bash
# Create environment file
echo 'NEXT_PUBLIC_SUPABASE_URL=your-url-here' > .env.local
echo 'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here' >> .env.local

# Start the app
npm run dev
```

### Step 4: Enable Auth (Optional, 2 min)

1. Supabase dashboard → **Authentication** → **Providers**
2. Enable **Google**:
   - [Google Cloud Console](https://console.cloud.google.com) → Create OAuth credentials
   - Add redirect URL from Supabase
   - Paste Client ID and Secret

---

## File Reference

| File | Purpose |
|---|---|
| `README.md` | Full documentation |
| `docs/QUICKSTART.md` | This file |
| `docs/API.md` | API reference |
| `docs/DEPLOYMENT.md` | Deployment guide |
| `docs/ARCHITECTURE.md` | Technical architecture |
| `supabase/schema.sql` | Database schema |
| `supabase/seed.sql` | Sample data |
| `.env.example` | Environment variable template |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CHANGELOG.md` | Version history |
| `LICENSE` | MIT License |

---

## Common Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run linter
```

---

## Pages

| URL | Page |
|---|---|
| `/` | Dashboard |
| `/staff` | Staff Directory |
| `/staff/:id` | Staff Profile |
| `/training` | Training Programs |
| `/training/:id` | Training Detail |
| `/reports` | Reports & Analytics |

---

## Need Help?

- **README.md** — Comprehensive documentation
- **GitHub Issues** — Report bugs or request features
- **Supabase Docs** — [supabase.com/docs](https://supabase.com/docs)