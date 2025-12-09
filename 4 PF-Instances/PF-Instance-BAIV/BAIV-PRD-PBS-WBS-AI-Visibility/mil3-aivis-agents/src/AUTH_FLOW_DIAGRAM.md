# Authentication Flow Diagram

Visual representation of how authentication works in the BAIV Dashboard.

## 🔄 Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       User Opens Dashboard                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  App.tsx Loads  │
                    └────────┬────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  AuthProvider Loads  │
                  │  (AuthContext.tsx)   │
                  └──────────┬───────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │  Check for Existing Session  │
              │  (supabase.auth.getSession)  │
              └──────────┬──────────┬────────┘
                         │          │
           ┌─────────────┘          └─────────────┐
           │                                      │
           ▼                                      ▼
    ┌──────────────┐                    ┌─────────────────┐
    │ Session      │                    │  No Session     │
    │ Found ✓      │                    │  Found ✗        │
    └──────┬───────┘                    └────────┬────────┘
           │                                      │
           ▼                                      ▼
    ┌──────────────┐                    ┌─────────────────┐
    │ Get Tenant   │                    │  Show Login     │
    │ ID from DB   │                    │  Page           │
    └──────┬───────┘                    └────────┬────────┘
           │                                      │
           ▼                                      ▼
    ┌──────────────┐                    ┌─────────────────┐
    │ Store in     │                    │ User Enters     │
    │ localStorage │                    │ Email/Password  │
    └──────┬───────┘                    └────────┬────────┘
           │                                      │
           ▼                                      ▼
    ┌──────────────┐                    ┌─────────────────┐
    │ Show         │                    │  Supabase       │
    │ Dashboard ✓  │                    │  Authentication │
    └──────────────┘                    └────────┬────────┘
                                                 │
                                      ┌──────────┴────────────┐
                                      │                       │
                                      ▼                       ▼
                              ┌───────────┐         ┌─────────────┐
                              │ Success ✓ │         │  Error ✗    │
                              └─────┬─────┘         └──────┬──────┘
                                    │                      │
                                    ▼                      ▼
                          ┌──────────────────┐   ┌──────────────┐
                          │ Get Tenant ID    │   │ Show Error   │
                          │ from DB          │   │ Message      │
                          └────────┬─────────┘   └──────────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ Store Session +  │
                          │ tenant_id        │
                          └────────┬─────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ Show Dashboard ✓ │
                          └──────────────────┘
```

## 📱 Component Hierarchy

```
App
 ├── AuthProvider (wraps entire app)
 │    └── Provides: { user, session, tenantId, signOut }
 │
 └── AppWrapper
      └── ProtectedRoute
           ├── If NOT authenticated → LoginPage
           │                            └── On success → AppContent
           │
           └── If authenticated → AppContent
                                   └── AppLayout
                                        ├── LeftNavigation
                                        │    └── Logout Button
                                        │
                                        └── All Dashboard Pages
```

## 🔐 Session Management

```
┌───────────────────────────────────────────────────────────┐
│                    Session Lifecycle                       │
└───────────────────────────────────────────────────────────┘

Day 1 (Monday)
  │
  ├─ User logs in
  │   └─ Session created
  │       └─ JWT expires in: 1 hour
  │       └─ Refresh token expires in: 7 days
  │
  ▼
Day 3 (Wednesday)
  │
  ├─ User returns to dashboard
  │   └─ AuthProvider checks session
  │       └─ JWT expired? → Auto-refresh using refresh_token
  │       └─ New JWT issued ✓
  │       └─ User stays logged in ✓
  │
  ▼
Day 8 (Next Monday)
  │
  ├─ User returns to dashboard
  │   └─ AuthProvider checks session
  │       └─ Refresh token expired ✗
  │       └─ Redirect to login page
  │       └─ User must re-authenticate
```

## 🌊 Data Flow

```
┌────────────────────────────────────────────────────────────┐
│              Making an Authenticated API Call               │
└────────────────────────────────────────────────────────────┘

Component
  │
  ├─ const { session, tenantId } = useAuth()
  │   │
  │   └─ Gets from AuthContext
  │       │
  │       └─ session.access_token (JWT)
  │       └─ tenantId (from tenant_users table)
  │
  ▼
fetch(API_URL, {
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'X-Tenant-ID': tenantId
  }
})
  │
  ▼
Backend API
  │
  ├─ Validates JWT with Supabase
  ├─ Checks tenant_id matches
  └─ Returns data ✓
```

## 🔒 Security Layers

```
┌────────────────────────────────────────────────────────────┐
│                      Security Layers                        │
└────────────────────────────────────────────────────────────┘

Layer 1: Frontend Route Protection
  └─ ProtectedRoute checks authentication
     └─ No session? → Redirect to login

Layer 2: Session Validation
  └─ AuthProvider verifies session with Supabase
     └─ Invalid session? → Clear localStorage, show login

Layer 3: JWT Token
  └─ Every API call includes Authorization header
     └─ Backend validates JWT with Supabase

Layer 4: Tenant Isolation
  └─ Every request includes tenant_id
     └─ Backend filters data by tenant_id

Layer 5: HTTPS Encryption
  └─ All communication encrypted
     └─ Prevents man-in-the-middle attacks
```

## 🔄 Auto Token Refresh

```
┌────────────────────────────────────────────────────────────┐
│                   Token Refresh Flow                        │
└────────────────────────────────────────────────────────────┘

User is using dashboard
  │
  ├─ JWT expires in 5 minutes
  │   └─ Supabase SDK detects expiration approaching
  │       └─ Automatically calls refresh endpoint
  │           └─ Uses refresh_token to get new JWT
  │               └─ New JWT issued ✓
  │                   └─ Session updated in AuthContext
  │                       └─ User continues working (no interruption)
  │
  └─ If refresh_token is expired
      └─ Cannot refresh
          └─ AuthProvider detects invalid session
              └─ Clears localStorage
                  └─ Shows login page
```

## 🚪 Logout Flow

```
┌────────────────────────────────────────────────────────────┐
│                        Logout Flow                          │
└────────────────────────────────────────────────────────────┘

User clicks "Logout" button
  │
  ├─ Calls signOut() from useAuth()
  │   │
  │   ├─ Calls supabase.auth.signOut()
  │   │   └─ Invalidates session on Supabase
  │   │
  │   ├─ Clears localStorage
  │   │   └─ Removes tenant_id
  │   │   └─ Removes user_email
  │   │
  │   └─ Updates AuthContext state
  │       └─ user = null
  │       └─ session = null
  │       └─ tenantId = null
  │
  ▼
ProtectedRoute detects no session
  │
  └─ Shows LoginPage
```

## 📊 State Management

```
┌────────────────────────────────────────────────────────────┐
│                   Auth State Storage                        │
└────────────────────────────────────────────────────────────┘

Supabase Internal (IndexedDB)
  ├─ Session object
  ├─ JWT access_token
  ├─ Refresh token
  └─ Expiry times

localStorage (Custom)
  ├─ tenant_id
  └─ user_email

AuthContext (React State)
  ├─ user (User object)
  ├─ session (Session object)
  ├─ tenantId (string)
  └─ loading (boolean)
```

## 🎯 Integration Points

```
┌────────────────────────────────────────────────────────────┐
│              How Components Use Auth                        │
└────────────────────────────────────────────────────────────┘

Any Component
  │
  └─ import { useAuth } from './components/auth/AuthContext'
      │
      └─ const { user, session, tenantId } = useAuth()
          │
          ├─ Display user info: user.email
          ├─ Make API calls: session.access_token
          └─ Filter data: tenantId
```

## 📝 Database Relationship

```
┌────────────────────────────────────────────────────────────┐
│                Database Schema Relationship                 │
└────────────────────────────────────────────────────────────┘

Supabase auth.users Table
  ├─ id (UUID)
  ├─ email
  └─ encrypted_password

       ↓ (one-to-one)

Custom tenant_users Table
  ├─ user_id (FK → auth.users.id)
  └─ tenant_id (string)

       ↓ (used in)

All API Calls
  └─ ?tenant_id=XXX
```

## ✨ Summary

The authentication system follows a **defense-in-depth** approach:

1. ✅ Frontend route protection
2. ✅ Session validation
3. ✅ JWT tokens
4. ✅ Tenant isolation
5. ✅ HTTPS encryption

All working together to provide secure, seamless authentication!
