# BAIV Dashboard Authentication System

This document explains the complete authentication system implementation for the BAIV AI Visibility Platform dashboard.

## Overview

The dashboard uses **Supabase Authentication** to secure all pages and features. Users must log in to access the dashboard, and sessions persist across browser sessions for 7 days.

## Architecture

### Components

1. **`/lib/supabase.ts`** - Supabase client configuration and authentication utilities
2. **`/components/auth/AuthContext.tsx`** - React Context for managing authentication state
3. **`/components/auth/AuthProvider.tsx`** - Wrapper component that provides auth context
4. **`/components/auth/LoginPage.tsx`** - Login UI component
5. **`/components/auth/ProtectedRoute.tsx`** - HOC that protects routes from unauthenticated access
6. **`/App.tsx`** - Main app with authentication flow
7. **`/components/AppContent.tsx`** - Protected dashboard content
8. **`/components/LeftNavigation.tsx`** - Navigation with logout button

### Authentication Flow

```
User Visits App
    ↓
AuthProvider loads
    ↓
Check for existing session
    ↓
    ├─ Session exists → Show Dashboard
    └─ No session → Show Login Page
         ↓
    User enters credentials
         ↓
    Supabase authentication
         ↓
    Fetch tenant_id from tenant_users table
         ↓
    Store session + tenant_id in localStorage
         ↓
    Show Dashboard
```

## Supabase Configuration

### Connection Details

```javascript
SUPABASE_URL: 'https://okwwcwaqscklcwnydfgk.supabase.co'
SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### Database Schema Required

The authentication system expects a `tenant_users` table in Supabase:

```sql
CREATE TABLE tenant_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  tenant_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Using Authentication in Components

### Access Current User Info

```typescript
import { useAuth } from './components/auth/AuthContext';

function MyComponent() {
  const { user, session, tenantId, loading } = useAuth();
  
  // user: Supabase User object
  // session: Current session with JWT token
  // tenantId: User's tenant ID from tenant_users table
  // loading: Boolean indicating if auth is still loading
  
  const jwtToken = session?.access_token;
  
  return (
    <div>
      <p>Welcome {user?.email}</p>
      <p>Tenant ID: {tenantId}</p>
    </div>
  );
}
```

### Making Authenticated API Calls

```typescript
import { useAuth } from './components/auth/AuthContext';

function MyComponent() {
  const { session, tenantId } = useAuth();
  
  const fetchData = async () => {
    const response = await fetch(
      `https://ecco-ai-vis-9wprj.ondigitalocean.app/api/endpoint?tenant_id=${tenantId}`,
      {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'X-Tenant-ID': tenantId || '',
          'Content-Type': 'application/json'
        }
      }
    );
    
    const data = await response.json();
    return data;
  };
  
  // Use fetchData...
}
```

### Logout Functionality

Logout is already built into the sidebar navigation. Users can click the "Logout" button at the bottom of the left sidebar.

Programmatically trigger logout:

```typescript
import { useAuth } from './components/auth/AuthContext';

function MyComponent() {
  const { signOut } = useAuth();
  
  return (
    <button onClick={() => signOut()}>
      Logout
    </button>
  );
}
```

## Session Persistence

- **Duration**: Sessions last 7 days by default
- **Auto-refresh**: Supabase automatically refreshes tokens before expiry
- **Storage**: Session stored in localStorage (handled by Supabase)
- **Multi-tab**: Session syncs across browser tabs

### How It Works

1. **Monday**: User logs in → Session created, expires in 7 days
2. **Wednesday**: User returns → Supabase checks refresh_token
   - If valid → Auto-refreshes JWT, user stays logged in
   - If expired → Redirects to login
3. **Next Monday**: User returns → Session expired, must re-login

## Security Features

1. **Protected Routes**: All dashboard pages require authentication
2. **Automatic Token Refresh**: Tokens refresh before expiration
3. **Secure Storage**: Credentials stored securely by Supabase SDK
4. **HTTPS Only**: All API calls use HTTPS encryption
5. **Tenant Isolation**: Each user tied to specific tenant_id

## Testing Authentication

### Test Accounts

You'll need to create test users in Supabase:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter email and password
4. Also add corresponding entry in `tenant_users` table

### Manual Testing Checklist

- [ ] Login with valid credentials → Should see dashboard
- [ ] Login with invalid credentials → Should see error message
- [ ] Close browser and reopen → Should still be logged in
- [ ] Click logout → Should return to login page
- [ ] Try accessing dashboard without login → Should redirect to login
- [ ] Wait for token refresh (check Network tab) → Should auto-refresh
- [ ] Check all API calls include Authorization header and tenant_id

## Troubleshooting

### "User not authenticated" Error

**Problem**: User can't access dashboard even after login

**Solutions**:
1. Check browser console for errors
2. Verify `tenant_users` table has entry for user
3. Check localStorage for `tenant_id` key
4. Clear localStorage and try again: `localStorage.clear()`

### Session Not Persisting

**Problem**: User logged out when closing browser

**Solutions**:
1. Check browser allows localStorage
2. Verify Supabase client config has `persistSession: true`
3. Check browser console for Supabase errors

### API Calls Failing with 401

**Problem**: API returns unauthorized even when logged in

**Solutions**:
1. Verify `Authorization` header is being sent
2. Check token hasn't expired: `console.log(session.access_token)`
3. Verify backend is validating Supabase JWT correctly
4. Check `tenant_id` query parameter is included

### Can't Login - Infinite Loading

**Problem**: Login button shows loading spinner forever

**Solutions**:
1. Check Supabase credentials are correct
2. Verify network connection
3. Check browser console for CORS errors
4. Verify Supabase project is active

## Environment Variables (Optional)

For production, consider moving Supabase credentials to environment variables:

```typescript
// .env
VITE_SUPABASE_URL=https://okwwcwaqscklcwnydfgk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// lib/supabase.ts
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## Future Enhancements

Consider adding:

- [ ] Password reset flow
- [ ] Email verification
- [ ] Multi-factor authentication (MFA)
- [ ] Role-based access control (RBAC)
- [ ] Social login (Google, Microsoft, etc.)
- [ ] Session timeout warnings
- [ ] Activity logging

## Support

For issues or questions about authentication:
1. Check this documentation
2. Review Supabase documentation: https://supabase.com/docs/guides/auth
3. Check browser console for errors
4. Contact development team

---

**Last Updated**: November 11, 2025
**Version**: 1.0.0
