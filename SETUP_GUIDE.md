# Church Website - Setup Instructions

## ✅ What's Been Done

1. **✓ Updated deprecated packages** - Replaced `@supabase/auth-helpers-nextjs` with `@supabase/ssr`
2. **✓ Updated all imports** - Fixed imports in 12 files across your project
3. **✓ Created .env.local** - Environment configuration file ready for Supabase credentials

## 📋 Next Steps - IMPORTANT

### Step 1: Get Supabase Credentials
1. Go to [app.supabase.com](https://app.supabase.com/)
2. Create a new project or select your existing one
3. In Settings → API, copy:
   - **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
   - **Anon Public Key** → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

### Step 2: Initialize Database
1. In your Supabase project, go to **SQL Editor**
2. Run these scripts in order:
   - `scripts/01-create-database-tables.sql`
   - `scripts/02-seed-sample-data.sql`
   - `scripts/03-create-admin-auth.sql`
   - `scripts/04-kids-and-home-schema.sql`
   - `scripts/05-update-home-content-schema.sql`

### Step 3: Set Up Admin User
1. Run `scripts/create-admin-user.sql` with your desired admin email/password
2. Admin panel is at: `/admin/login`

### Step 4: Start Development Server
```bash
npm run dev
```
Then visit: [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure
- `/app` - Next.js pages and routes
- `/components` - React components (admin, home, kids sections)
- `/lib` - Utilities and services (Supabase helpers, auth)
- `/scripts` - SQL migration scripts
- `/public` - Static assets

## 🔐 Features Included
- ✓ Admin authentication
- ✓ Home page management
- ✓ Sermons management
- ✓ Events management
- ✓ Kids ministry content
- ✓ Ministries directory
- ✓ Contact messages
- ✓ JSC Zones (Life Groups)
- ✓ Testimonials

## 🚀 Deployment
After testing locally, deploy to Vercel:
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo
4. Add environment variables (same as `.env.local`)
5. Deploy!

## ❓ Troubleshooting
- **Port 3000 already in use?** Run `npx kill-port 3000` or use a different port: `npm run dev -- -p 3001`
- **Can't connect to Supabase?** Check your environment variables in `.env.local`
- **Database errors?** Make sure all SQL scripts have been run in the correct order
