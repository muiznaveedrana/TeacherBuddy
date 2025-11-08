# Admin Authentication Setup Guide

## ✅ Installation Complete!

Your Supabase authentication system is now ready. Follow these steps to create your first admin user and start using the admin dashboard.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Create Your Admin Account

1. **Sign up via Supabase Auth UI** or use the SQL console:

```sql
-- Option A: If you already have a Supabase user account
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

**OR**

2. **Create new admin user via Supabase Dashboard:**
   - Go to: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/auth/users
   - Click "Invite User" or "Add User"
   - Enter your email and set a password
   - Confirm the user

3. **Grant admin role:**

```sql
-- Run this in Supabase SQL Editor
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-actual-email@example.com';
```

---

### Step 2: Test Login

1. Visit: **http://localhost:3000/login**
2. Enter your admin credentials
3. You'll be redirected to **/admin/library**

---

### Step 3: Verify Access

Admin-only features now protected:
- ✅ `/admin/library` - Admin dashboard
- ✅ `/api/admin/library/*` - Admin API routes
- ✅ Publish/unpublish worksheets
- ✅ Edit/delete any worksheet

---

## 🔒 Security Features

### What's Protected:

1. **Admin Pages** (`src/app/admin/layout.tsx`)
   - Automatically redirects non-admins to login page
   - Server-side validation on every request

2. **Admin API Routes**
   - `/api/admin/library` - List all worksheets (admin only)
   - `/api/admin/library/[id]` - Get/update/delete worksheet (admin only)
   - `/api/admin/library/[id]/publish` - Publish worksheet (admin only)
   - `/api/admin/library/[id]/unpublish` - Unpublish worksheet (admin only)

3. **Database RLS (Row Level Security)**
   - Admins can update any worksheet
   - Regular users can only update their own
   - Public users can only view published worksheets

---

## 📝 Database Schema

### `profiles` Table

| Column     | Type      | Description                    |
|------------|-----------|--------------------------------|
| id         | UUID      | User ID (FK to auth.users)     |
| email      | TEXT      | User email                     |
| full_name  | TEXT      | User's full name               |
| role       | TEXT      | 'user' or 'admin'              |
| created_at | TIMESTAMP | Account creation date          |
| updated_at | TIMESTAMP | Last update                    |

---

## 🛠️ Helper Functions

### Server-Side (Next.js API Routes & Server Components)

```typescript
import { isAdmin, getUser, requireAdmin } from '@/lib/auth/authHelpers'

// Check if user is admin
const admin = await isAdmin()

// Get current user
const user = await getUser()

// Require admin (throws error if not)
await requireAdmin()
```

### Client-Side (React Components)

```typescript
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})

// Logout
await supabase.auth.signOut()

// Check role
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()
```

---

## 🎯 Production Deployment

### Before Going Live:

1. **Set Environment Variables:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Verify RLS Policies:**
   ```sql
   -- Run in Supabase SQL Editor to verify
   SELECT * FROM profiles WHERE role = 'admin';
   ```

3. **Test Auth Flow:**
   - ✅ Non-admin users redirected from `/admin/*`
   - ✅ API routes return 401 for non-admins
   - ✅ Login page works correctly

4. **Create Admin Users:**
   ```sql
   UPDATE profiles
   SET role = 'admin'
   WHERE email IN ('admin1@example.com', 'admin2@example.com');
   ```

---

## 🔥 Common Issues

### Issue: "Unauthorized: Admin access required"

**Solution:** Grant admin role:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### Issue: Login page not redirecting

**Solution:** Check browser console for errors. Verify:
- ✅ Supabase environment variables set
- ✅ User has 'admin' role in database
- ✅ User authenticated successfully

### Issue: "Profile not found"

**Solution:** The profile is auto-created on signup. If missing, create manually:

```sql
INSERT INTO profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'your-email@example.com';
```

---

## 📚 Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js SSR Package](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🎉 You're All Set!

Your admin authentication is now live:
1. Visit **http://localhost:3000/login**
2. Sign in with your admin credentials
3. Access the admin dashboard at **/admin/library**

Any non-admin users will be automatically blocked from accessing admin features.

---

**Need Help?** Check the Supabase logs or contact your development team.
