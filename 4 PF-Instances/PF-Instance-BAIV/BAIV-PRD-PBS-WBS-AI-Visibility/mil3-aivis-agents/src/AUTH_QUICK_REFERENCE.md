# Authentication Quick Reference

One-page cheat sheet for using the BAIV authentication system.

## 🔐 Import Auth Hook

```typescript
import { useAuth } from './components/auth/AuthContext';
```

## 👤 Get User Info

```typescript
const { user, session, tenantId, loading, signOut } = useAuth();

// user.id - Supabase user ID
// user.email - User email address
// session.access_token - JWT for API calls
// tenantId - User's tenant ID
// loading - Boolean if auth is loading
// signOut() - Function to logout
```

## 🌐 Make API Calls

```typescript
const { session, tenantId } = useAuth();

const response = await fetch(
  `${API_URL}/endpoint?tenant_id=${tenantId}`,
  {
    headers: {
      'Authorization': `Bearer ${session?.access_token}`,
      'X-Tenant-ID': tenantId || '',
      'Content-Type': 'application/json'
    }
  }
);
```

## 🚪 Logout User

```typescript
const { signOut } = useAuth();

// Call this anywhere to logout
await signOut();
```

## 🔒 Protect a Route (Already Done)

All routes are already protected by `<ProtectedRoute>` in App.tsx.
No additional work needed!

## 📝 Supabase Credentials

```
URL: https://okwwcwaqscklcwnydfgk.supabase.co
Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🗃️ Database Schema

```sql
-- tenant_users table links Supabase users to tenants
CREATE TABLE tenant_users (
  user_id UUID REFERENCES auth.users(id),
  tenant_id TEXT NOT NULL
);
```

## ✅ Create Test User

```sql
-- 1. Create user in Supabase Dashboard (Authentication > Users)
-- 2. Then run this SQL:

INSERT INTO tenant_users (user_id, tenant_id)
SELECT id, 'demo-tenant-123'
FROM auth.users
WHERE email = 'test@example.com';
```

## 🧪 Test Credentials

After creating user in Supabase:
- Email: `your-email@example.com`
- Password: `YourPassword123!`

## 🎯 Common Patterns

### Check if Logged In

```typescript
const { user } = useAuth();

if (!user) {
  return <div>Not logged in</div>;
}
```

### Get User Email

```typescript
const { user } = useAuth();
const userEmail = user?.email || 'Guest';
```

### Get JWT Token

```typescript
const { session } = useAuth();
const jwt = session?.access_token;
```

### Show Loading State

```typescript
const { loading } = useAuth();

if (loading) {
  return <div>Loading...</div>;
}
```

## 🔄 Session Duration

- **Default**: 7 days
- **Auto-refresh**: Yes, automatic
- **Persistence**: localStorage
- **Multi-tab**: Synced across tabs

## 📱 Login Page Location

`/components/auth/LoginPage.tsx`

## 🛠️ Configuration File

`/lib/supabase.ts`

## 📚 Full Documentation

- `/AUTHENTICATION.md` - Complete technical docs
- `/AUTHENTICATION_SETUP.md` - Setup guide
- `/IMPLEMENTATION_SUMMARY.md` - Implementation details

## 🐛 Quick Debug

```typescript
// Log current auth state
const { user, session, tenantId } = useAuth();
console.log('Auth State:', { user, session, tenantId });

// Check localStorage
console.log('Stored Tenant ID:', localStorage.getItem('tenant_id'));
console.log('Stored Email:', localStorage.getItem('user_email'));
```

## ⚡ Common Issues

| Issue | Solution |
|-------|----------|
| Can't login | Check Supabase credentials |
| No tenant_id | Add entry to tenant_users table |
| Session lost | Check localStorage permissions |
| 401 errors | Verify JWT in Authorization header |

---

**That's it!** Use `useAuth()` hook anywhere to access user data and make authenticated API calls.
