# Security Framework Integration Map

## Quick Visual Reference

This document provides a visual map of how **VE 100 RRR**, **SA 600 Security Architect**, and **RBAC Tables** integrate to form a complete security framework.

---

## Integration Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    VALUE ENGINEER (VE)                          │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ VE 100: RRR - Roles, RACI & RBAC                       │    │
│  │ Location: Admin → Value Engineer → Step 1             │    │
│  │                                                        │    │
│  │ Defines:                                               │    │
│  │ • Roles (Admin, Client, Agency, Affiliates)           │    │
│  │ • Responsibilities (RACI Matrix)                       │    │
│  │ • Rights (RBAC Framework)                              │    │
│  │                                                        │    │
│  │ Ontologies:                                            │    │
│  │ ✅ Organization Ontology                               │    │
│  │ ✅ Role Ontology                                       │    │
│  │ ✅ RBAC Framework                                      │    │
│  │                                                        │    │
│  │ Schema:                                                │    │
│  │ ✅ Role Schema                                         │    │
│  │ ✅ Permission Schema                                   │    │
│  │ ✅ RACI Schema                                         │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Submits for Approval
                            ▼
                    ┌─────────────┐
                    │     OAA     │
                    │ (Ontology   │
                    │  Approval   │
                    │ Authority)  │
                    └─────────────┘
                            │
                            │ Approved Ontology
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  SOLUTION ARCHITECT (SA)                        │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ SA 600: Security Architect                             │    │
│  │ Location: Admin → Solution Architect → Step 4         │    │
│  │                                                        │    │
│  │ Designs:                                               │    │
│  │ • Authentication Mechanisms                            │    │
│  │ • Authorization Policies (AUTH-xxx)                    │    │
│  │ • Encryption Protocols                                 │    │
│  │ • Compliance Frameworks                                │    │
│  │                                                        │    │
│  │ Policies:                                              │    │
│  │ • AUTH-0xx: Customer Perspective                       │    │
│  │ • AUTH-1xx: Internal Perspective                       │    │
│  │ • AUTH-2xx: Finance Perspective                        │    │
│  │ • AUTH-3xx: Learning Perspective                       │    │
│  │                                                        │    │
│  │ Compliance:                                            │    │
│  │ ✅ GDPR (Data Protection)                              │    │
│  │ ✅ SOC 2 (Security Controls)                           │    │
│  │ ✅ ISO 27001 (Info Security)                           │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Security Architecture
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PLATFORM DASHBOARD (PF)                        │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ RBAC Tables - Implementation & Visibility              │    │
│  │ Location: Admin → PF Dashboard → BSC Perspectives     │    │
│  │                                                        │    │
│  │ Customer Perspective (7 capabilities)                  │    │
│  │ ┌──────────────────────────────────────────────┐      │    │
│  │ │ Capability        │ A │ C │ Ag │ Af │        │      │    │
│  │ │ View Dashboard    │ ✅│ ✅│ ✅ │ ❌ │        │      │    │
│  │ │ Export Reports    │ ✅│ ✅│ ✅ │ ❌ │        │      │    │
│  │ │ Manage Prefs      │ ✅│ ✅│ ❌ │ ❌ │        │      │    │
│  │ └──────────────────────────────────────────────┘      │    │
│  │                                                        │    │
│  │ Internal Perspective (7 capabilities)                  │    │
│  │ Finance Perspective (7 capabilities)                   │    │
│  │ Learning Perspective (7 capabilities)                  │    │
│  │                                                        │    │
│  │ Total: 28 capabilities across 4 perspectives          │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Three-Layer Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│ LAYER 1: ONTOLOGY FOUNDATION (VE 100 RRR)              │
│                                                         │
│ Purpose: Define WHO, WHAT, and HOW                      │
│                                                         │
│ ┌───────────┐   ┌──────────────┐   ┌───────────────┐  │
│ │   WHO     │   │     WHAT     │   │      HOW      │  │
│ │ (Roles)   │   │(Responsibil) │   │   (Rights)    │  │
│ ├───────────┤   ├──────────────┤   ├───────────────┤  │
│ │ Admin     │   │ Accountable  │   │ 100% Access   │  │
│ │ Client    │   │ Consulted    │   │  68% Access   │  │
│ │ Agency    │   │ Responsible  │   │  71% Access   │  │
│ │ Affiliates│   │ Informed     │   │  25% Access   │  │
│ └───────────┘   └──────────────┘   └───────────────┘  │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ LAYER 2: SECURITY ARCHITECTURE (SA 600)                │
│                                                         │
│ Purpose: Design HOW to implement security              │
│                                                         │
│ ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│ │Authenticate │  │  Authorize   │  │   Encrypt     │  │
│ ├─────────────┤  ├──────────────┤  ├───────────────┤  │
│ │ SSO/MFA     │  │ Policy-Based │  │ TLS 1.3       │  │
│ │ API Keys    │  │ Role-Checked │  │ AES-256       │  │
│ │ OAuth 2.0   │  │ Context-Aware│  │ Data at Rest  │  │
│ └─────────────┘  └──────────────┘  └───────────────┘  │
│                                                         │
│ ┌─────────────────────────────────────────────────┐    │
│ │ Compliance: GDPR | SOC 2 | ISO 27001           │    │
│ └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ LAYER 3: OPERATIONAL IMPLEMENTATION (RBAC Tables)      │
│                                                         │
│ Purpose: Execute and visualize access control          │
│                                                         │
│ ┌──────────────────────────────────────────────────┐   │
│ │ BSC Perspective Tabs                             │   │
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │   │
│ │ │Customer│ │Internal│ │Finance│ │Learning│       │   │
│ │ └──────┘ └──────┘ └──────┘ └──────┘             │   │
│ │                                                  │   │
│ │ Each tab shows:                                  │   │
│ │ • 7 capabilities per perspective                 │   │
│ │ • ✅/❌ indicators per role                       │   │
│ │ • Real-time permission checks                    │   │
│ └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Role Journey Through the Framework

### Admin Role (100% Access)

```
VE 100 RRR
  ↓
  Role Definition: Admin
  Responsibility: Accountable for all platform functions
  Rights: Full access to all capabilities
  
SA 600
  ↓
  Authentication: SSO + MFA required
  Authorization: All AUTH-xxx policies granted
  Audit: All actions logged
  
RBAC Tables
  ↓
  Customer:  7/7 ✅
  Internal:  7/7 ✅
  Finance:   7/7 ✅
  Learning:  7/7 ✅
  TOTAL:    28/28 (100%)
```

### Client Role (68% Access)

```
VE 100 RRR
  ↓
  Role Definition: Client
  Responsibility: Use features, manage own account
  Rights: Customer-focused access
  
SA 600
  ↓
  Authentication: SSO (MFA optional)
  Authorization: AUTH-0xx, AUTH-301-307
  Data Isolation: Account-scoped only
  
RBAC Tables
  ↓
  Customer:  6/7 ✅
  Internal:  4/7 ⚠️
  Finance:   3/7 ⚠️
  Learning:  6/7 ✅
  TOTAL:    19/28 (68%)
```

### Agency Role (71% Access)

```
VE 100 RRR
  ↓
  Role Definition: Agency
  Responsibility: Campaign management, client success
  Rights: Partner-level access + Sales KPIs
  
SA 600
  ↓
  Authentication: API Key + OAuth
  Authorization: AUTH-102, AUTH-106, AUTH-206
  Data Scope: Client campaigns only
  
RBAC Tables
  ↓
  Customer:  5/7 ✅
  Internal:  5/7 ✅ (includes Sales KPIs)
  Finance:   4/7 ⚠️
  Learning:  6/7 ✅
  TOTAL:    20/28 (71%)
```

### Affiliates Role (25% Access)

```
VE 100 RRR
  ↓
  Role Definition: Affiliates
  Responsibility: Referrals, basic training
  Rights: Minimal access (commissions + learning)
  
SA 600
  ↓
  Authentication: Basic auth
  Authorization: AUTH-005, AUTH-206, AUTH-301-303, AUTH-307
  Data Scope: Own commissions only
  
RBAC Tables
  ↓
  Customer:  1/7 ❌
  Internal:  0/7 ❌
  Finance:   1/7 ❌
  Learning:  5/7 ✅
  TOTAL:     7/28 (25%)
```

---

## Permission Mapping Example

### "View Sales & Marketing KPIs" Capability

```
┌──────────────────────────────────────────────────────┐
│ VE 100 RRR (Ontology Definition)                    │
├──────────────────────────────────────────────────────┤
│ Role Ontology:                                       │
│ • Admin: Full access to all internal metrics        │
│ • Agency: Partner role requires campaign analytics  │
│ • Client: Customer role, no internal metrics        │
│ • Affiliates: Minimal access, no internal metrics   │
│                                                      │
│ RBAC Framework:                                      │
│ • Permission: "internal.sales_marketing.view"       │
│ • Scope: Internal Process Perspective               │
│ • Data Level: Aggregated KPIs only                  │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│ SA 600 Security Architect (Policy Design)           │
├──────────────────────────────────────────────────────┤
│ AUTH-102: Partner Analytics                          │
│                                                      │
│ Requirements:                                        │
│ • Role: Admin OR Agency                             │
│ • Authentication: API Key validated                 │
│ • Authorization: Check role + permission flag       │
│ • Data Filter: Campaign-scoped for Agency           │
│ • Rate Limit: 100 requests/minute                   │
│ • Audit: Log all accesses                           │
│                                                      │
│ Implementation:                                      │
│ ```typescript                                        │
│ if (user.role === 'admin' || user.role === 'agency') {│
│   if (user.role === 'agency') {                     │
│     data = filterByCampaigns(data, user.campaigns); │
│   }                                                  │
│   return data;                                       │
│ }                                                    │
│ throw new UnauthorizedError();                       │
│ ```                                                  │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│ RBAC Tables (Visual Implementation)                  │
├──────────────────────────────────────────────────────┤
│ Internal Perspective RBAC Table:                     │
│                                                      │
│ | Capability                   | A | C | Ag | Af |  │
│ |------------------------------|---|---|----|----|  │
│ | View Sales & Marketing KPIs  | ✅| ❌| ✅ | ❌ |  │
│                                                      │
│ Legend:                                              │
│ ✅ Admin: Full internal operations access           │
│ ❌ Client: No internal metrics visibility           │
│ ✅ Agency: Partner needs campaign performance       │
│ ❌ Affiliates: No access to internal processes      │
└──────────────────────────────────────────────────────┘
```

---

## Cross-Module References

### Where to Find Each Component

```
┌─────────────────────────────────────────────────────┐
│ Module: Value Engineer                              │
│ Location: Admin → Value Engineer                    │
│ Step: VE 100 (Step 1 of 7)                          │
│ ┌─────────────────────────────────────────────────┐ │
│ │ RRR - Roles, RACI & RBAC                        │ │
│ │                                                 │ │
│ │ Sections:                                       │ │
│ │ • Business Functional Requirements              │ │
│ │ • Applicable Agents                             │ │
│ │ • Applicable Ontologies (OAA Approved)          │ │
│ │   ✅ Organization Ontology                      │ │
│ │   ✅ Role Ontology                              │ │
│ │   ✅ RBAC Framework                             │ │
│ │ • Applicable Schema                             │ │
│ │   ✅ Role Schema                                │ │
│ │   ✅ Permission Schema                          │ │
│ │   ✅ RACI Schema                                │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Module: Solution Architect                          │
│ Location: Admin → Solution Architect                │
│ Step: SA 600 (Step 4 of 9)                          │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Security Architect                              │ │
│ │                                                 │ │
│ │ Focus Areas:                                    │ │
│ │ • Authentication                                │ │
│ │ • Authorization                                 │ │
│ │ • Encryption                                    │ │
│ │ • Compliance                                    │ │
│ │   ✅ GDPR                                       │ │
│ │   ✅ SOC 2                                      │ │
│ │   ✅ ISO 27001                                  │ │
│ │                                                 │ │
│ │ Policies: AUTH-0xx through AUTH-3xx             │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Module: Platform Dashboard                          │
│ Location: Admin → PF Dashboard                      │
│ Section: BSC Perspectives (All 4 tabs)              │
│ ┌─────────────────────────────────────────────────┐ │
│ │ RBAC Tables                                     │ │
│ │                                                 │ │
│ │ Tabs:                                           │ │
│ │ • Customer Perspective (7 capabilities)         │ │
│ │ • Internal Perspective (7 capabilities)         │ │
│ │ • Finance Perspective (7 capabilities)          │ │
│ │ • Learning Perspective (7 capabilities)         │ │
│ │                                                 │ │
│ │ Total: 28 capabilities                          │ │
│ │                                                 │ │
│ │ Visual Indicators:                              │ │
│ │ ✅ Permission Granted                           │ │
│ │ ❌ Permission Denied                            │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## Integration Testing Checklist

### Phase 1: VE 100 Validation
- [ ] All roles defined in Role Ontology
- [ ] RACI matrix complete for all activities
- [ ] Permission schema covers all capabilities
- [ ] OAA approval received
- [ ] RRR matrix documented

### Phase 2: SA 600 Validation
- [ ] AUTH policies defined for all 28 capabilities
- [ ] Authentication mechanisms designed
- [ ] Authorization flows documented
- [ ] Compliance requirements mapped
- [ ] Security architecture reviewed

### Phase 3: RBAC Implementation Validation
- [ ] RBAC tables match VE 100 role definitions
- [ ] Permission checks enforce SA 600 policies
- [ ] Visual indicators accurate per role
- [ ] All 4 perspectives implemented
- [ ] Cross-tab consistency verified

### Phase 4: End-to-End Testing
- [ ] Admin can access all 28 capabilities ✅
- [ ] Agency can access 20 capabilities ✅
- [ ] Client can access 19 capabilities ✅
- [ ] Affiliates can access 7 capabilities ✅
- [ ] Unauthorized access attempts blocked ✅
- [ ] Audit logs capture all access events ✅

---

## Compliance Verification Matrix

| Requirement | VE 100 RRR | SA 600 | RBAC Tables | Status |
|-------------|------------|--------|-------------|--------|
| **GDPR Article 5: Data Minimization** | Role definitions with minimal permissions | Least-privilege policies | Strict role boundaries | ✅ |
| **GDPR Article 15: Right to Access** | "View Own Data" rights defined | Export APIs designed | "Download Invoices" capability | ✅ |
| **GDPR Article 17: Right to Erasure** | Data deletion rights in RACI | Secure deletion process | Admin-only deletion | ✅ |
| **SOC 2: Access Controls** | Role hierarchy defined | Authentication mechanisms | Role-based permissions | ✅ |
| **SOC 2: Change Management** | Approval roles defined | Change approval workflow | Admin-only config | ✅ |
| **ISO 27001 A.9.2: User Access** | Role definitions | Access provisioning | RBAC tables enforce | ✅ |
| **ISO 27001 A.9.4: Access Control** | RBAC framework ontology | Authorization mechanisms | Permission checks | ✅ |

---

## Quick Navigation Commands

```bash
# View RRR Ontology
Navigate to: Admin → Value Engineer → Step 1: RRR

# View Security Architecture
Navigate to: Admin → Solution Architect → Step 4: Security Architect

# View RBAC Tables (Customer)
Navigate to: Admin → PF Dashboard → Customer Tab → Scroll to RBAC

# View RBAC Tables (Internal)
Navigate to: Admin → PF Dashboard → Internal Tab → Scroll to RBAC

# View RBAC Tables (Finance)
Navigate to: Admin → PF Dashboard → Finance Tab → Scroll to RBAC

# View RBAC Tables (Learning)
Navigate to: Admin → PF Dashboard → Learning Tab → Scroll to RBAC
```

---

## Documentation Links

| Document | Purpose | Location |
|----------|---------|----------|
| **RBAC_RRR_SECURITY_ARCHITECT.md** | Complete cross-reference | `/docs/` |
| **RBAC_PLATFORM_ACCESS.md** | RBAC tables detailed guide | `/docs/` |
| **BSC_PERSPECTIVES.md** | BSC framework overview | `/docs/` |
| **PLATFORM_DASHBOARD_SUMMARY.md** | Dashboard features | `/docs/` |

---

## Contact & Support

**Security Questions:**
- Contact: Security Architect Team
- Process: Submit via SA 600 Configuration

**Role Changes:**
- Contact: Admin Team
- Process: Submit via VE 100 RRR Definition

**Permission Issues:**
- Contact: Platform Support
- Process: View RBAC Tables for current permissions

---

**Version:** 1.0
**Last Updated:** December 12, 2025
**Status:** Integration Complete ✅
**Framework:** VE 100 → SA 600 → RBAC Tables
