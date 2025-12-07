# Auth Events Quick Reference 🔐

## Supabase Auth State Events

### ✅ Events Handled in App.tsx

| Event | Trigger | Actions | Result |
|-------|---------|---------|--------|
| **SIGNED_IN** | User logs in successfully | • Set authenticated<br>• Store JWT token<br>• Log to console | User accesses dashboard |
| **TOKEN_REFRESHED** ⭐ | Auto-refresh (~50 min) | • Update JWT token<br>• Log to console | User stays logged in |
| **SIGNED_OUT** | User logs out or session expires | • Clear localStorage<br>• Set unauthenticated<br>• Log to console | Redirect to login |

---

## Console Messages to Expect

### Normal Flow

```bash
# On Login
Auth state changed: SIGNED_IN
JWT token stored on sign in

# Every ~50 minutes (automatic)
Auth state changed: TOKEN_REFRESHED
JWT token automatically refreshed

# On Logout
Auth state changed: SIGNED_OUT
User signed out - localStorage cleared
```

---

## Testing Commands

### Check Current Session
```javascript
// In browser console
const { data: { session } } = await supabase.auth.getSession();
console.log('Token expires:', new Date(session.expires_at * 1000));
console.log('Current token:', localStorage.getItem('jwt_token'));
```

### Force Token Refresh
```javascript
// In browser console
await supabase.auth.refreshSession();
// Should trigger TOKEN_REFRESHED event
```

### Check Auth State Listener
```javascript
// Verify listener is active
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Test listener:', event);
});
```

---

## Troubleshooting

### Issue: No TOKEN_REFRESHED events
**Check**: 
- Wait full 50 minutes
- Supabase auto-refresh is enabled
- Browser tab is active

### Issue: User logged out unexpectedly
**Check**:
- Console for SIGNED_OUT event
- Refresh token expiry (30 days)
- Network connectivity

### Issue: 401 Unauthorized errors
**Check**:
- JWT token in localStorage
- Token not expired
- Backend accepts the token

---

## Production Monitoring

Monitor for these patterns:

✅ **Healthy Session**:
```
SIGNED_IN → TOKEN_REFRESHED → TOKEN_REFRESHED → ... → SIGNED_OUT
```

❌ **Unexpected Logout**:
```
SIGNED_IN → SIGNED_OUT (too soon)
```

⚠️ **No Refresh** (investigate):
```
SIGNED_IN → (no TOKEN_REFRESHED after 50+ min)
```

---

## Key Files

- **`/App.tsx`** - Auth state listener
- **`/lib/supabase.ts`** - Supabase client
- **`/lib/eccoAPI.ts`** - API calls using JWT

---

**Last Updated**: November 12, 2025
