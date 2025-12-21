# 404 Endpoint Analysis

## 🔍 Identified Failing Endpoints

### 1. `/api/discovery_audit/latest` - 404 Not Found
**Location**: `AppContent.tsx:164`  
**Purpose**: Load latest audit data for dashboard  
**Critical**: NO - Dashboard has fallback logic

### 2. `/api/gap_analysis/opportunities` - 404 Not Found  
**Location**: `AppContent.tsx:201`  
**Purpose**: Show content gaps in "Top Opportunities" section  
**Critical**: NO - Already has try/catch fallback

---

## 📊 Analysis

### Endpoint #1: `/api/discovery_audit/latest`

**Problem**: This endpoint doesn't exist in backend  

**Actual Working Endpoint**: `/api/discovery_audit/{audit_id}`

**Evidence from DiscoveryAuditPage.tsx**:
```typescript
// ✅ Working endpoint - gets specific audit by ID
const auditDataResponse = await callEccoAPI(
  `/api/discovery_audit/${auditId}`,
  'GET'
);
```

**Why it's failing**: 
- Backend doesn't have a "latest" endpoint
- You need an audit_id to fetch audit data
- The "latest" was a planned feature that was never implemented

**Impact**: 
- Dashboard shows onboarding state (empty state)
- Not critical - fallback logic works correctly
- User can still run discovery audit and access all features

---

### Endpoint #2: `/api/gap_analysis/opportunities`

**Problem**: This endpoint doesn't exist in backend

**Evidence**: No gap_analysis endpoint in any working code

**Why it's failing**:
- This was a planned feature
- Never implemented in backend
- Frontend optimistically tried to fetch it

**Impact**:
- "Top Opportunities" section on dashboard is empty
- Already has try/catch - fails silently
- Console warning logged
- Not critical - doesn't break dashboard

---

## 🛠️ Recommended Actions

### Option 1: Remove the Non-Existent API Calls (RECOMMENDED)
**Pros**: 
- Clean console (no 404 errors)
- Faster dashboard load (no failed requests)
- Honest about what exists

**Cons**:
- Dashboard won't show opportunities until backend built

### Option 2: Keep Calls (Current State)
**Pros**: 
- When backend adds these endpoints, frontend already ready
- Fallback logic already works

**Cons**:
- Console 404 errors (confusing)
- Unnecessary failed network requests

---

## 📝 Code Changes Needed (Option 1)

### Change 1: Remove `/api/discovery_audit/latest` call

**File**: `/components/AppContent.tsx:163-166`

**Current Code**:
```typescript
const auditResponse = await callEccoAPI(
  `/api/discovery_audit/latest`,
  'GET'
);
```

**Replacement Strategy**:
Since we don't have a "latest" endpoint, we should:
1. Check localStorage for last known audit_id
2. If audit_id exists, fetch that specific audit
3. If not, show onboarding/empty state

---

### Change 2: Remove `/api/gap_analysis/opportunities` call

**File**: `/components/AppContent.tsx:200-206`

**Current Code**:
```typescript
let gapsData: any = { items: [] };
try {
  gapsData = await callEccoAPI(
    `/api/gap_analysis/opportunities?limit=5`,
    'GET'
  );
} catch (gapsError) {
  console.warn('Failed to fetch gaps data:', gapsError);
}
```

**Replacement Strategy**:
Simply remove this entire block since:
1. Endpoint doesn't exist
2. Falls back to empty array anyway
3. Not used anywhere else

---

## 🎯 Implementation Plan

### Step 1: Store Last Audit ID
When discovery audit completes, store audit_id in localStorage:
```typescript
localStorage.setItem('last_audit_id', auditId);
```

### Step 2: Update Dashboard Data Fetch
Change AppContent.tsx to:
1. Check for last_audit_id
2. Fetch that specific audit
3. Show onboarding if no audit exists

### Step 3: Remove Gap Analysis Call
Simply delete the API call since:
- Endpoint doesn't exist
- Not critical for dashboard
- Can be added later when backend ready

---

## ✅ Expected Results After Fix

**Console**:
- ❌ Before: 2x 404 errors
- ✅ After: Clean console, no errors

**Dashboard Behavior**:
- ✅ Shows onboarding if no audit run yet
- ✅ Shows real audit data if audit exists
- ✅ Top Opportunities section hidden (until backend ready)

**User Experience**:
- No change - fallback logic already works
- Cleaner console for debugging
- Faster page load (no failed requests)

---

## 🚫 What NOT to Do

❌ DO NOT add mock data  
❌ DO NOT add bypass modes  
❌ DO NOT fake successful responses  
✅ DO show honest empty states when data doesn't exist

---

## 🔄 Alternative: Backend Implementation

If you want these endpoints to work, backend needs:

### 1. GET `/api/discovery_audit/latest`
**Returns**: Most recent audit for tenant
```json
{
  "id": "audit_id",
  "status": "completed",
  "overall_visibility_score": 73,
  "citation_patterns": {...},
  "gaps_identified": 8,
  "audit_completed_at": "2025-01-15T10:30:00Z"
}
```

### 2. GET `/api/gap_analysis/opportunities`
**Returns**: List of content gaps
```json
{
  "items": [
    {
      "id": "gap_1",
      "priority": "HIGH",
      "title": "Missing FAQ about pricing",
      "estimated_impact": "High visibility boost",
      "priority_score": 95
    }
  ]
}
```

---

## 📌 Summary

**Failing Endpoints**: 2  
**Critical**: No  
**Recommended Action**: Remove the calls  
**Time to Fix**: 10 minutes  
**Breaking Changes**: None (fallbacks already exist)

---

**Next Step**: Should I remove these failing API calls to clean up the console?
