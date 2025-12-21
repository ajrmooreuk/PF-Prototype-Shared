# Platform Foundation: ROLES/RACI/RBAC Ontology
## Comprehensive Glossary v3.0.0

**Version:** 1.0.0  
**Date:** 2025-10-11  
**Ontology:** pf:ontology:roles-raci-rbac-v3.0.0

---

## Table of Contents

- [Overview](#overview)
- [Core Entities](#core-entities)
- [Relationships](#relationships)
- [Properties Reference](#properties-reference)
- [AI Agent Usage Guide](#ai-agent-usage-guide)

---

## Overview

This glossary provides comprehensive definitions for all terms in the Platform Foundation ROLES/RACI/RBAC Ontology. The ontology enables organizational governance through three integrated frameworks:

1. **ROLES** - Organizational positions (executive and functional) that individuals fill
2. **RACI** - Accountability framework (Responsible, Accountable, Consulted, Informed)
3. **RBAC** - Role-Based Access Control for system permissions

---

## Core Entities

### 1. ExecutiveRole

**Type:** Entity  
**Schema.org Base:** `schema:OrganizationalRole`  
**Status:** Active

#### Definition
A C-Suite or senior executive position with strategic accountability within an organization. Executive roles are filled by INDIVIDUALS and define high-level responsibilities, strategic focus areas, and alignment with organizational frameworks like VSOM and Balanced Scorecard.

#### When to Use
Use ExecutiveRole when defining C-Suite positions and senior leadership roles that have strategic accountability. ExecutiveRoles are typically seniorityLevel=1.

#### Business Meaning
Represents the highest level of organizational leadership positions that set strategic direction, make major decisions, and are accountable for business outcomes.

#### Technical Meaning
A class extending schema:OrganizationalRole with properties for roleCode, roleCategory, strategicFocus, VSOM alignment, BSC perspective, key frameworks, and metrics.

#### Examples
- **CEO** - Chief Executive Officer (Core Traditional CSuite)
- **CMO** - Chief Marketing Officer (Core Traditional CSuite)
- **CAIO** - Chief AI Officer (Data Analytics CSuite)
- **CFO** - Chief Financial Officer (Core Traditional CSuite)

#### Key Properties
- `roleCode` - Short code (2-5 uppercase letters, e.g., "CEO")
- `roleTitle` - Full title (e.g., "Chief Executive Officer")
- `roleCategory` - One of 7 CSuite categories
- `strategicFocus` - Primary strategic area
- `vsomComponent` - VSOM framework alignment
- `bscPerspective` - Balanced Scorecard perspective
- `keyFrameworks` - Management frameworks used
- `primaryMetrics` - KPIs owned by this role
- `seniorityLevel` - Numeric level (1 for C-Suite)

#### Relationships
- Filled by INDIVIDUALS via `RoleAssignment`
- May `reportsTo` other ExecutiveRoles
- Has `collaboratesWith` for matrix management
- Requires `capabilities`
- Governed by `AccessPolicies`
- Assigned RACI accountability

#### AI Agent Usage
AI agents query ExecutiveRoles to understand organizational leadership structure, identify strategic accountability, resolve RACI assignments, and determine authorization through RBAC policies.

---

### 2. FunctionalRole

**Type:** Entity  
**Schema.org Base:** `schema:EmployeeRole`  
**Status:** Active

#### Definition
An operational or functional position below executive level, typically within a specific department or function. Functional roles are filled by INDIVIDUALS and report to ExecutiveRoles.

#### When to Use
Use FunctionalRole for non-executive positions that perform operational work within specific functional areas (Marketing, Sales, Operations, Technology, etc.).

#### Business Meaning
Represents day-to-day operational roles that execute strategy and perform functional activities within departments.

#### Technical Meaning
A class extending schema:EmployeeRole with properties for function, roleTitle, and seniorityLevel.

#### Examples
- **Marketing Manager** (Marketing, seniorityLevel=3)
- **Senior Data Scientist** (Data, seniorityLevel=3)
- **Sales Representative** (Sales, seniorityLevel=5)

#### Key Properties
- `function` - Department (Marketing, Sales, Operations, Finance, Technology, HR, Legal, Product, Data, Customer Success, Strategy, Innovation, Compliance, Security)
- `roleTitle` - Full title
- `seniorityLevel` - Numeric level (typically 2-10)

#### Relationships
- Filled by INDIVIDUALS via `RoleAssignment`
- `reportsTo` ExecutiveRole or another FunctionalRole
- Has `capabilities`
- Governed by `AccessPolicies`
- Assigned RACI accountability

#### AI Agent Usage
AI agents use FunctionalRoles to understand operational structure, resolve reporting relationships, determine task ownership, and evaluate permissions.

---

### 3. RoleAssignment

**Type:** Entity  
**Schema.org Base:** `schema:Thing` (custom extension)  
**Status:** Active

#### Definition
Assignment of an INDIVIDUAL (schema:Person) to a ROLE within an ORGANIZATION context. This is the bridge entity that connects real people to organizational positions and enables multi-venture role portfolios.

#### When to Use
Use RoleAssignment whenever an INDIVIDUAL fills a ROLE in an ORGANIZATION. One person can have multiple RoleAssignments across different organizations.

#### Business Meaning
Represents the actual staffing of organizational positions - who is doing which job in which company.

#### Technical Meaning
A reified relationship entity linking schema:Person to pf:ExecutiveRole or pf:FunctionalRole within a schema:Organization context, with temporal and commitment attributes.

#### Examples
- Amanda Moore (INDIVIDUAL) assigned to CEO role at BAIV with assignmentType='Primary' and timeCommitment=80%
- Amanda Moore (INDIVIDUAL) assigned to CMO role at W4M with assignmentType='Advisory' and timeCommitment=20%

#### Key Properties
- `individual` - The INDIVIDUAL (schema:Person) filling the role [REQUIRED]
- `role` - The ROLE being assigned [REQUIRED]
- `organization` - The ORGANIZATION context [REQUIRED]
- `assignmentType` - Primary, Secondary, Acting, Interim, Advisory, Board, Consultant [REQUIRED]
- `timeCommitment` - Percentage (0-100)
- `isActive` - Boolean (true/false) [REQUIRED]
- `startDate` - When assignment began
- `endDate` - When assignment ended (null if active)

#### Business Rules
- **BR-004:** If isActive=true, endDate must be null
- **BR-005:** Total timeCommitment across active assignments for a person should not exceed 100% (warning)

#### Relationships
- Links to `INDIVIDUAL` via individual property
- Links to `ROLE` via assignedRole property
- Links to `ORGANIZATION` via inOrganization property
- Creates effective permission inheritance for USERS

#### AI Agent Usage
AI agents use RoleAssignment to resolve who currently holds which roles, determine permission inheritance for USERS, analyze capability coverage, and generate organizational charts. Critical for authorization queries.

---

### 4. RACIAssignment

**Type:** Entity  
**Schema.org Base:** `schema:Thing` (custom extension)  
**Status:** Active

#### Definition
Defines who is Responsible, Accountable, Consulted, or Informed for a specific activity or process. RACI assignments are made to ROLES, not directly to INDIVIDUALS.

#### RACI Explained
- **Responsible** - Does the work to complete the activity
- **Accountable** - Owns the outcome and has final authority (only ONE per activity)
- **Consulted** - Provides input and expertise (two-way communication)
- **Informed** - Kept updated on progress (one-way communication)

#### When to Use
Use RACIAssignment to define accountability for activities and processes. Each activity must have exactly one Accountable role and at least one Responsible role.

#### Business Meaning
Clarifies who does the work (Responsible), who owns the outcome (Accountable), who provides input (Consulted), and who stays informed (Informed) for each business activity.

#### Technical Meaning
Entity linking an activity/process to a ROLE with a raciType indicator. Enforces business rules for accountability clarity.

#### Example
For activity "Develop AI Strategy":
- CEO role: raciType='Accountable'
- CAIO role: raciType='Responsible'
- CMO role: raciType='Consulted'
- CFO role: raciType='Informed'

#### Key Properties
- `activity` - The activity or process [REQUIRED]
- `role` - The ROLE with this RACI assignment [REQUIRED]
- `raciType` - Responsible, Accountable, Consulted, or Informed [REQUIRED]
- `context` - Additional contextual notes
- `organization` - Organization scope (optional)

#### Business Rules
- **BR-001:** Each activity must have exactly ONE Accountable role (error)
- **BR-002:** Each activity must have at least ONE Responsible role (error)
- **BR-009:** RACI applies to ROLES, not individuals (info)

#### Relationships
- Links to `activity` via activity property
- Links to `ROLE` via role property
- May be scoped to `organization`

#### AI Agent Usage
AI agents query RACIAssignments to answer "who is accountable/responsible for X?", validate RACI matrices, generate RACI reports, and trace accountability chains from strategy to execution.

---

### 5. Capability

**Type:** Entity  
**Schema.org Base:** `schema:Action`  
**Status:** Active

#### Definition
An ability, skill, or competency that can be performed by a role or required for a role. Capabilities define what actions or activities a role should be able to perform.

#### When to Use
Use Capability to define the skills and competencies required by roles. Helps with gap analysis and role definition.

#### Business Meaning
Represents the skills and abilities needed to successfully perform a role's responsibilities.

#### Technical Meaning
Entity extending schema:Action with properties for capabilityType, proficiencyRequired, and related frameworks.

#### Examples
- **Strategic Planning** (Strategic, Expert proficiency)
- **Brand Management** (Business, Advanced proficiency)
- **AI Ethics & Governance** (Strategic, Expert proficiency)

#### Key Properties
- `capabilityName` - Name of the capability [REQUIRED]
- `capabilityType` - Technical, Business, Leadership, Analytical, Creative, Strategic, Operational
- `proficiencyRequired` - Basic, Intermediate, Advanced, Expert
- `relatedFrameworks` - Associated frameworks (e.g., Blue Ocean Strategy, BSC)

#### Relationships
- Required by ROLES via `hasCapability`

#### AI Agent Usage
AI agents use Capabilities to assess organizational capability coverage, identify skill gaps, match people to roles, and recommend training needs.

---

### 6. Permission

**Type:** Entity  
**Schema.org Base:** `schema:Thing` (custom extension)  
**Status:** Active

#### Definition
Authorization to perform an action on a resource. Permissions are granted to USERS (not roles directly) through AccessPolicies that bind roles to permissions.

#### When to Use
Use Permission to define what actions can be performed on what resources, with optional conditions. Permissions are packaged in AccessPolicies.

#### Business Meaning
Defines what actions users are allowed or denied to perform on specific resources, with contextual conditions.

#### Technical Meaning
Entity specifying action, resource, optional conditions, and effect (Allow/Deny). Core building block of RBAC system.

#### Examples
- action='Approve', resource='Budget', effect='Allow' (unlimited)
- action='Approve', resource='Budget', conditions=[amount<$10K], effect='Allow' (limited)
- action='Export', resource='SensitiveData', effect='Deny' (explicit denial)

#### Key Properties
- `action` - Create, Read, Update, Delete, Execute, Approve, Share, Export, Import, Publish [REQUIRED]
- `resource` - Resource type or identifier [REQUIRED]
- `conditions` - Array of AccessConditions (optional)
- `effect` - Allow or Deny [REQUIRED, default=Allow]

#### Relationships
- Granted by `AccessPolicy`
- May have `AccessConditions`

#### AI Agent Usage
AI agents evaluate Permissions when resolving authorization queries. They check action, resource, conditions, and apply conflict resolution rules.

---

### 7. AccessPolicy

**Type:** Entity  
**Schema.org Base:** `schema:Thing` (custom extension)  
**Status:** Active

#### Definition
Binds ROLES to PERMISSIONS. This is the core RBAC mechanism - USERS who fill roles inherit the permissions defined in the AccessPolicies for those roles.

#### When to Use
Use AccessPolicy to group permissions and assign them to roles. When a USER fills a role via RoleAssignment, they inherit the permissions from that role's AccessPolicies.

#### Business Meaning
Defines what a role is allowed to do in the system. Separates authorization from identity by using roles as the intermediary.

#### Technical Meaning
Entity linking a ROLE to a set of Permissions, with optional organization scope, priority for conflict resolution, and active status.

#### Examples
- **CEO Full Access Policy** - Grants unlimited approvals, strategy access
- **Manager Limited Policy** - Grants approvals under $10K, read-only strategy
- **Consultant Restricted Policy** - Allows reading, explicitly denies export

#### Key Properties
- `role` - The ROLE this policy applies to [REQUIRED]
- `permissions` - Set of Permissions granted [REQUIRED, at least 1]
- `organization` - Organization scope (optional, null = global)
- `priority` - Conflict resolution priority (higher wins)
- `isActive` - Boolean [REQUIRED, default=true]

#### Business Rules
- **BR-007:** Highest priority wins; Deny overrides Allow at same priority
- **BR-008:** USERS inherit permissions from ROLES

#### Relationships
- Applies to `ROLE`
- Grants `Permissions`
- May be scoped to `Organization`

#### AI Agent Usage
AI agents traverse AccessPolicies to determine what a USER can do.  
**Resolution path:** User → Person → RoleAssignments → Roles → AccessPolicies → Permissions

Critical for authorization decisions.

---

### 8. AccessCondition

**Type:** Entity  
**Schema.org Base:** `schema:Thing` (custom extension)  
**Status:** Active

#### Definition
A conditional constraint that must be satisfied for a permission to apply. Enables context-aware access control.

#### When to Use
Use AccessCondition to add contextual rules to permissions, such as value thresholds, time windows, or resource attributes.

#### Business Meaning
Allows fine-grained control where permissions depend on the context (e.g., amount, time, location).

#### Technical Meaning
Entity with attribute, operator, and value that evaluates to true/false at runtime.

#### Examples
- attribute='amount', operator='lessThan', value='10000' (budget under $10K)
- attribute='status', operator='equals', value='archived' (archived documents only)
- attribute='age', operator='greaterThan', value='365' (older than 1 year)

#### Key Properties
- `attribute` - The attribute to evaluate [REQUIRED]
- `operator` - equals, notEquals, lessThan, lessThanOrEqual, greaterThan, greaterThanOrEqual, contains, in [REQUIRED]
- `value` - The value to compare against [REQUIRED]

#### Relationships
- Attached to `Permission` via conditions property

#### AI Agent Usage
AI agents evaluate AccessConditions at runtime when checking permissions. If conditions fail, permission is denied even if policy would otherwise allow.

---

## Relationships

### hasRoleAssignment
**Source:** schema:Person → **Target:** pf:RoleAssignment  
**Cardinality:** 0..*  
**Inverse:** assignedToIndividual

Links an INDIVIDUAL to their RoleAssignments. One person can have multiple RoleAssignments.

**Usage:** Navigate from a person to all their role assignments across organizations.

---

### assignedRole
**Source:** pf:RoleAssignment → **Target:** pf:ExecutiveRole, pf:FunctionalRole  
**Cardinality:** 1..1  
**Inverse:** hasAssignment

The role that is assigned in a RoleAssignment.

**Usage:** Identify which role is filled by this assignment.

---

### inOrganization
**Source:** pf:RoleAssignment → **Target:** schema:Organization  
**Cardinality:** 1..1  
**Inverse:** hasRoleAssignment

The organization context for a RoleAssignment.

**Usage:** Determine which organization this role assignment belongs to.

---

### reportsTo
**Source:** Role → **Target:** Role  
**Cardinality:** 0..1  
**Inverse:** manages

Hierarchical reporting relationship between roles. **Must be acyclic (BR-003).**

**Usage:** Define formal reporting relationships in organizational hierarchy.

---

### collaboratesWith
**Source:** Role → **Target:** Role  
**Cardinality:** 0..*  
**Inverse:** collaboratesWith (symmetric)

Symmetric peer collaboration relationship between roles.

**Usage:** Model matrix management and cross-functional collaboration without hierarchy.

---

### hasCapability
**Source:** Role → **Target:** pf:Capability  
**Cardinality:** 0..*  
**Inverse:** requiredByRole

Capabilities required by a role.

**Usage:** Define skills and competencies needed for a role.

---

### hasRACIAssignment
**Source:** schema:Action → **Target:** raci:RACIAssignment  
**Cardinality:** 1..*  
**Inverse:** raciFor

RACI assignments for an activity.

**Usage:** Link activities to their RACI accountability definitions.

---

### governedBy
**Source:** Role → **Target:** rbac:AccessPolicy  
**Cardinality:** 0..*  
**Inverse:** appliesTo

Access policies that govern a role.

**Usage:** Identify what permissions a role has through policies.

---

### grantsPermission
**Source:** rbac:AccessPolicy → **Target:** rbac:Permission  
**Cardinality:** 1..*  
**Inverse:** grantedBy

Permissions granted by a policy.

**Usage:** Enumerate the specific permissions a policy provides.

---

## Properties Reference

### Common Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| @type | String | Entity type | "pf:ExecutiveRole" |
| @id | String | Unique identifier | "role:ceo" |
| name | String | Display name | "Chief Executive Officer" |
| description | String | Detailed description | "C-Suite position..." |

### ExecutiveRole Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| roleCode | String | ✅ | 2-5 uppercase letters (e.g., CEO) |
| roleTitle | String | ✅ | Full formal title |
| roleCategory | Enum | ✅ | One of 7 CSuite categories |
| strategicFocus | String | ❌ | Primary strategic area |
| vsomComponent | String | ❌ | VSOM alignment |
| bscPerspective | Enum | ❌ | Balanced Scorecard perspective |
| keyFrameworks | Array[String] | ❌ | Management frameworks |
| primaryMetrics | Array[String] | ❌ | KPIs owned |
| aiVisibilityRole | String | ❌ | AI visibility role |
| seniorityLevel | Integer | ✅ | 1-10 (1 for C-Suite) |

### RoleAssignment Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| individual | Person | ✅ | The person filling the role |
| role | Role | ✅ | The role being filled |
| organization | Organization | ✅ | Organization context |
| assignmentType | Enum | ✅ | Primary, Advisory, etc. |
| timeCommitment | Float | ❌ | 0-100% |
| isActive | Boolean | ✅ | Active status |
| startDate | Date | ❌ | Start date |
| endDate | Date | ❌ | End date (null if active) |

---

## AI Agent Usage Guide

### Authorization Queries

**Pattern:** "Can {user} {action} {resource} in {organization}?"

**Resolution Steps:**
1. Identify the USER and their linked INDIVIDUAL
2. Find all active RoleAssignments for that INDIVIDUAL in the specified ORGANIZATION
3. For each assigned ROLE, retrieve all AccessPolicies
4. Collect all Permissions from those policies
5. Filter permissions matching the requested action and resource
6. Evaluate any conditions
7. Apply conflict resolution (priority, Deny override)
8. Return: Allow or Deny

**Example:** "Can amanda.moore@baiv.io approve budget over $10K in BAIV?"

---

### RACI Queries

**Pattern:** "Who is {raciType} for {activity}?"

**Resolution Steps:**
1. Find RACIAssignments for the specified activity
2. Filter by raciType (Responsible, Accountable, Consulted, Informed)
3. Return the ROLES
4. Optionally resolve to current INDIVIDUALS via active RoleAssignments

**Example:** "Who is Accountable for 'AI Strategy Development' activity?"

---

### Capability Gap Analysis

**Pattern:** "What capabilities are missing in {organization}?"

**Resolution Steps:**
1. Retrieve all ExecutiveRoles defined
2. Find active RoleAssignments in the organization
3. Identify roles with no active assignments (unfilled)
4. Aggregate required capabilities from unfilled roles
5. Return capability gap report

**Example:** "What executive capabilities are missing in startup venture X?"

---

### Multi-Venture Portfolio

**Pattern:** "What roles does {individual} hold?"

**Resolution Steps:**
1. Find all active RoleAssignments for the individual
2. Group by organization
3. Include role title, assignment type, time commitment
4. Calculate total time commitment

**Example:** "What roles does Amanda Moore hold across all ventures?"

---

## Version History

**v3.0.0** (2025-10-11)
- Initial release
- 8 core entities defined
- 9 relationships specified
- 10 business rules documented
- 7 AI capabilities mapped
- Comprehensive glossary with 13 defined terms

---

**Glossary Maintained By:** Platform Foundation Team  
**Contact:** ajrmooreuk@gmail.com  
**Last Updated:** 2025-10-11
