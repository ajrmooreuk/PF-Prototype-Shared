# Security Architect Access Control (RBAC)

## Overview

Role-Based Access Control (RBAC) tables are integrated into the **Security Architect (SA 600)** step within the Solution Architect module. These tables clearly define which user roles (Admin, Client, Agency, Affiliates) have access to specific platform capabilities across four perspectives: Customer, Internal, Finance, and Learning & Growth.

**Location:** Admin → Solution Architect → Step 4: Security Architect (SA 600)

The Security Architect step features:
- Security focus areas (Authentication, Authorization, Encryption, Compliance)
- RBAC roles summary cards
- 4 perspective tabs with complete RBAC tables (Customer, Internal, Finance, Learning)
- Security policy codes reference
- Overall RBAC summary statistics

---

## User Roles

### 1. Admin ⚡
**Access Level:** Full Platform Access

- Complete system administration
- Configuration and settings management
- User management
- All data access and analytics
- Financial oversight
- Content creation and management

### 2. Client 👤
**Access Level:** Customer-Focused Access

- Personal account management
- Product usage and features
- Own billing and invoices
- Support and feedback
- Training and certifications
- Historical data access (own account)

### 3. Agency 🏢
**Access Level:** Partner Access

- Campaign management
- Client performance analytics
- Marketing KPIs and reports
- Commission tracking
- Training resources
- Limited administrative functions

### 4. Affiliates 🤝
**Access Level:** Limited Partner Access

- Referral tracking
- Commission reports
- Basic training access
- Support ticket submission
- Limited visibility

---

## RBAC Tables by Perspective

### Customer Perspective Access Control

**Purpose:** Permissions for customer-facing metrics and features

| Capability | Admin | Client | Agency | Affiliates |
|------------|-------|--------|--------|------------|
| View Metrics Dashboard | ✅ | ✅ | ✅ | ❌ |
| Export Customer Reports | ✅ | ✅ | ✅ | ❌ |
| Manage Customer Preferences | ✅ | ✅ | ❌ | ❌ |
| Access Historical Data | ✅ | ✅ | ✅ | ❌ |
| Submit Feedback/Support Tickets | ✅ | ✅ | ✅ | ✅ |
| View Satisfaction Scores | ✅ | ✅ | ✅ | ❌ |
| Configure Alerts/Notifications | ✅ | ✅ | ❌ | ❌ |

**Key Insights:**
- Affiliates have very limited access - only support ticket submission
- Clients can manage their own preferences and view their data
- Agencies can view metrics but cannot modify client preferences
- Only Admins and Clients can configure their own alerts

---

### Internal Process Perspective Access Control

**Purpose:** Permissions for internal operations and processes

| Capability | Admin | Client | Agency | Affiliates |
|------------|-------|--------|--------|------------|
| View Platform Operations Metrics | ✅ | ❌ | ❌ | ❌ |
| View Sales & Marketing KPIs | ✅ | ❌ | ✅ | ❌ |
| Access Development Tools | ✅ | ❌ | ❌ | ❌ |
| Submit Bug Reports | ✅ | ✅ | ✅ | ❌ |
| View System Status | ✅ | ✅ | ✅ | ❌ |
| Manage Campaign Analytics | ✅ | ❌ | ✅ | ❌ |
| Access API Documentation | ✅ | ✅ | ✅ | ❌ |

**Key Insights:**
- Platform operations metrics are Admin-only (99.7% uptime, API response times, etc.)
- Agencies get special access to Sales & Marketing KPIs for campaign management
- Affiliates have NO access to internal metrics
- Bug reporting available to Admin, Client, and Agency roles
- API documentation accessible to technical users (Admin, Client, Agency)

---

### Financial Perspective Access Control

**Purpose:** Permissions for financial data and billing

| Capability | Admin | Client | Agency | Affiliates |
|------------|-------|--------|--------|------------|
| View Full Financial Dashboard | ✅ | ❌ | ❌ | ❌ |
| View Own Billing Information | ✅ | ✅ | ✅ | ❌ |
| Download Invoices | ✅ | ✅ | ✅ | ❌ |
| Manage Payment Methods | ✅ | ✅ | ✅ | ❌ |
| View Revenue Metrics | ✅ | ❌ | ❌ | ❌ |
| Access Commission Reports | ✅ | ❌ | ✅ | ✅ |
| Modify Pricing/Plans | ✅ | ❌ | ❌ | ❌ |

**Key Insights:**
- Full financial dashboard (ARR, MRR, Gross Margin) is Admin-only
- Clients and Agencies can manage their own billing but not see platform revenue
- Affiliates can ONLY see commission reports - no other financial access
- Pricing and plan modifications restricted to Admin only
- Commission transparency for revenue partners (Agency & Affiliates)

---

### Learning & Growth Perspective Access Control

**Purpose:** Permissions for training and development resources

| Capability | Admin | Client | Agency | Affiliates |
|------------|-------|--------|--------|------------|
| Access Training Library | ✅ | ✅ | ✅ | ✅ |
| Enroll in Courses | ✅ | ✅ | ✅ | ✅ |
| View Certification Progress | ✅ | ✅ | ✅ | ✅ |
| Access Advanced AI Training | ✅ | ✅ | ✅ | ❌ |
| Create/Manage Training Content | ✅ | ❌ | ❌ | ❌ |
| View Team Training Analytics | ✅ | ✅ | ✅ | ❌ |
| Download Certifications | ✅ | ✅ | ✅ | ✅ |

**Key Insights:**
- Most permissive perspective - learning is encouraged for all users
- All roles can access training library and earn certifications
- Advanced AI training excluded for Affiliates (basic partners)
- Content creation is Admin-only
- Team analytics available to Admin, Client, and Agency
- Certification downloads available to all roles

---

## Permission Matrix Summary

### Total Capabilities by Perspective

| Perspective | Total Capabilities | Admin Access | Client Access | Agency Access | Affiliates Access |
|-------------|-------------------|--------------|---------------|---------------|-------------------|
| Customer | 7 | 7 (100%) | 6 (86%) | 5 (71%) | 1 (14%) |
| Internal | 7 | 7 (100%) | 4 (57%) | 5 (71%) | 0 (0%) |
| Finance | 7 | 7 (100%) | 3 (43%) | 4 (57%) | 1 (14%) |
| Learning | 7 | 7 (100%) | 6 (86%) | 6 (86%) | 5 (71%) |
| **TOTAL** | **28** | **28 (100%)** | **19 (68%)** | **20 (71%)** | **7 (25%)** |

---

## Role Comparison

### Admin (28/28 - 100%)
- Full system access across all perspectives
- Exclusive access to: Platform operations, revenue metrics, pricing, content creation
- Can perform all functions

### Client (19/28 - 68%)
- Strong customer-facing access
- Can manage own account, billing, preferences
- Full learning & development access
- Cannot see internal operations or revenue metrics

### Agency (20/28 - 71%)
- Balanced partner access
- Special access to Sales & Marketing KPIs
- Commission reports and campaign analytics
- Cannot modify pricing or see platform operations

### Affiliates (7/28 - 25%)
- Minimal access - basic partner level
- Focus on: Training, commissions, certifications
- Cannot access financial data, internal metrics, or customer data
- Support ticket submission only customer-facing capability

---

## Access Patterns by Capability Type

### Universal Access (All Roles)
- Submit Feedback/Support Tickets (Customer only - Affiliates too)
- Access Training Library
- Enroll in Courses
- View Certification Progress
- Download Certifications

### Customer-Focused (Admin, Client, Agency)
- View Metrics Dashboard
- Export Customer Reports
- Access Historical Data
- View Satisfaction Scores

### Partner-Focused (Admin, Agency, Affiliates)
- Access Commission Reports

### Admin-Only (Admin)
- View Platform Operations Metrics
- View Revenue Metrics
- Modify Pricing/Plans
- Create/Manage Training Content
- Access Development Tools

---

## Visual Representation

```
┌─────────────────────────────────────────────────────┐
│                     ADMIN                           │
│  ✅ ✅ ✅ ✅ ✅ ✅ ✅ (100% Access)                    │
│  Customer | Internal | Finance | Learning           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    AGENCY                           │
│  ✅ ✅ ✅ ✅ ✅ ⚠️  ❌  (71% Access)                   │
│  Strong partner access + Sales/Marketing KPIs       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    CLIENT                           │
│  ✅ ✅ ⚠️  ❌  ✅ ✅ (68% Access)                      │
│  Customer-focused + Full learning access            │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                  AFFILIATES                         │
│  ❌  ❌  ❌  ⚠️  ✅  ❌  ❌  (25% Access)              │
│  Minimal access - Training + Commissions only       │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Details

### UI Components

**Location:** Each BSC Perspective Tab (Customer, Internal, Finance, Learning)

**Position:** Below Goals and Initiatives sections

**Components Used:**
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` from shadcn/ui
- `Shield` icon from lucide-react
- `Check` (✅) and `X` (❌) icons for permissions

### Table Structure

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Capability</TableHead>
      <TableHead>Admin</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Agency</TableHead>
      <TableHead>Affiliates</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {capabilities.map((cap) => (
      <TableRow>
        <TableCell>{cap.capability}</TableCell>
        <TableCell>
          {cap.admin ? <Check /> : <X />}
        </TableCell>
        {/* ... other roles */}
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Data Structure

```typescript
const rbacPermissions = {
  customer: {
    title: "Customer Perspective Access Control",
    description: "Permissions for customer-facing metrics and features",
    capabilities: [
      {
        capability: "View Metrics Dashboard",
        admin: true,
        client: true,
        agency: true,
        affiliates: false,
      },
      // ... more capabilities
    ],
  },
  // ... other perspectives
};
```

---

## Use Cases

### Use Case 1: Client Onboarding
**Scenario:** New client signs up

**Access Granted:**
- Customer Dashboard ✅
- Own billing management ✅
- Training library ✅
- Support tickets ✅

**Access Denied:**
- Platform operations ❌
- Revenue metrics ❌
- Other customers' data ❌

### Use Case 2: Agency Partnership
**Scenario:** Marketing agency joins as partner

**Access Granted:**
- Sales & Marketing KPIs ✅
- Campaign analytics ✅
- Commission reports ✅
- Client performance data ✅

**Access Denied:**
- Platform infrastructure metrics ❌
- Full financial dashboard ❌
- Pricing modifications ❌

### Use Case 3: Affiliate Program
**Scenario:** Affiliate marketer signs up

**Access Granted:**
- Commission tracking ✅
- Basic training ✅
- Certifications ✅

**Access Denied:**
- Customer data ❌
- Financial metrics ❌
- Internal operations ❌
- Advanced training ❌

---

## Security Considerations

### Data Isolation
- Each role sees only data relevant to their permissions
- Billing information isolated per account
- Commission reports filtered by role

### Audit Trails
- All access logged by role
- Permission changes tracked
- Unauthorized access attempts monitored

### Compliance
- GDPR: Minimal data access per role
- SOC 2: Role-based access controls
- ISO 27001: Access management aligned

---

## Future Enhancements

### Planned Features
- [ ] Custom role creation (e.g., "Marketing Manager", "Finance Viewer")
- [ ] Temporary permission grants with expiration
- [ ] Role hierarchy (e.g., "Senior Agency" with more access)
- [ ] Permission request workflow
- [ ] Granular data-level permissions (e.g., specific product access)
- [ ] Multi-factor authentication requirements per role
- [ ] IP whitelisting for sensitive roles

### Advanced RBAC
- [ ] Attribute-Based Access Control (ABAC)
- [ ] Context-aware permissions (time, location, device)
- [ ] Dynamic role assignment based on behavior
- [ ] Integration with SSO providers (Okta, Auth0)

---

## Related Documentation

- `/docs/BSC_PERSPECTIVES.md` - BSC framework overview
- `/docs/PLATFORM_DASHBOARD_SUMMARY.md` - Dashboard features
- `/docs/SALES_MARKETING_KPIS.md` - Internal perspective KPIs
- `/docs/RBAC_RRR_SECURITY_ARCHITECT.md` - Cross-reference to RRR ontology and Security Architect ✨

---

## Quick Reference Card

```
┌───────────────────────────────────────────────────────────┐
│  ROLE          | ACCESS LEVEL    | KEY PERMISSIONS        │
├───────────────────────────────────────────────────────────┤
│  Admin         | 100% (28/28)    | Everything            │
│  Agency        | 71% (20/28)     | Sales KPIs + Campaigns │
│  Client        | 68% (19/28)     | Own Account + Learning │
│  Affiliates    | 25% (7/28)      | Commissions + Training │
└───────────────────────────────────────────────────────────┘

MOST RESTRICTED PERSPECTIVE: Internal (Affiliates: 0%)
MOST OPEN PERSPECTIVE: Learning (All roles have access)
```

---

**Last Updated:** December 12, 2025
**Version:** 1.0
**Component:** Platform Dashboard - RBAC Tables
**Status:** Production Ready ✅