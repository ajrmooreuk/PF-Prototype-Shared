# OAA v3.0.0 Quick Start Guide

**Version:** 3.0.0  
**Date:** 2025-11-16  
**System Prompt:** `oaa-system-prompt-v3.0.0.txt`  
**Status:** Production Ready

---

## What's New in v3.0.0

### 🎯 Competency Validation
- Domain-specific competency requirements (Marketing, Strategy, Organization, CMO roles)
- Validates mandatory entities and relationships for each domain
- ≥90% competency score required for production

### 🔒 100% Quality Completeness Gates
- **GATE 1:** Entity Descriptions (100%)
- **GATE 2:** Relationship Cardinality (100%)
- **GATE 3:** Business Rules Format (100%)
- **GATE 4:** Property Mappings (100%)
- **GATE 5:** Test Data Coverage (100%)

No production ontology proceeds without passing ALL gates.

### 🔌 External Tool Integration
- Accept structured JSON from NextJS/Figma/UI modules
- Return validation errors in structured format for UI display
- Support incremental validation (validate as user builds)
- Real-time quality metrics feedback

### 🔍 Registry Query & Lookup
- Search by purpose, domain, or tenant
- Recommend reusable entities from PF-Core
- Detect duplicate ontologies (>70% similarity warning)
- Suggest extend vs. create new

### 📝 Enhanced Change Control
- Track what/why/who for all changes
- Comprehensive changelog format
- Link to change control entity in registry
- Semantic versioning enforcement

---

## Quick Usage

### Creating a New Ontology

```
User: "Create an ontology for marketing campaigns"

OAA v3.0.0 will:
1. Query registry for existing marketing/campaign ontologies
2. Present PF-Core entities for reuse
3. Load marketing domain competency requirements
4. Guide through creation workflow
5. Validate competency throughout
6. Run 100% completeness gates
7. Generate Registry v3.0 entry
```

### Converting v2.0 to v3.0

```
User: "Convert this organization ontology to v3.0"

OAA v3.0.0 will:
1. Load and analyze v2.0 ontology
2. Map to Registry v3.0 format
3. Run completeness gates
4. If FAIL: Show which gates failed and what's missing
5. If PASS: Generate complete Registry v3.0 entry
```

### Interactive UI Integration (NextJS/Figma)

**Send JSON:**
```json
{
  "mode": "incremental",
  "ontologyId": "work-in-progress-id",
  "domain": "marketing",
  "entities": [...],
  "relationships": [...],
  "businessRules": [...]
}
```

**Receive Structured Response:**
```json
{
  "status": "in_progress",
  "validationResults": {
    "errors": [...],
    "warnings": [...],
    "info": [...]
  },
  "qualityMetrics": {
    "completeness": 60,
    "schemaOrgAlignment": 85,
    "competencyScore": 75,
    "completenessGates": {
      "entityDescriptions": "67% (2/3)",
      "relationshipCardinality": "100% (1/1)",
      ...
    }
  },
  "competencyStatus": {
    "missingEntities": ["Audience", "Channel"],
    "missingRelationships": ["Campaign-targets-Audience"]
  },
  "recommendations": [...]
}
```

---

## Domain Competency Requirements

### Marketing Domain
**Required Entities:** Campaign, Audience, Channel, Content, Message  
**Required Relationships:** Campaign→Audience, Campaign→Channel, Campaign→Content  
**Competency Score:** ≥90%

### Strategy Domain
**Required Entities:** Capability, Initiative, Objective, KeyResult  
**Required Relationships:** Initiative→Objective, Objective→KeyResult  
**Competency Score:** ≥90%

### Organization Domain
**Required Entities:** Organization, Team, Person, Role, Department  
**Required Relationships:** Organization→Team, Team→Person, Person→Role  
**Competency Score:** ≥90%

### CMO Role Ontology
**Required Entities:** CMO Role (linked to RRR v3), Marketing Capability, Responsibility, Authority  
**Required Relationships:** CMO→Capability, CMO→Authority, CMO→C-Suite Collaboration  
**Competency Score:** ≥90%

---

## Completeness Gates

### Production Requirements (ALL must be 100%)

| Gate | Requirement | Example Failure |
|------|-------------|-----------------|
| **GATE 1** | Entity Descriptions | 1 entity missing description |
| **GATE 2** | Relationship Cardinality | Relationship missing "1..*" format |
| **GATE 3** | Business Rules Format | Rule not in "IF...THEN" format |
| **GATE 4** | Property Mappings | Property neither mapped to schema.org nor has rationale |
| **GATE 5** | Test Data Coverage | Entity type has 0 test instances |

**Result:** If ANY gate fails → No registry entry generated → Fix required

---

## Registry Query Examples

### Query by Purpose
```
Input: "marketing campaigns"
Output: 
- PF-Core: Entry-003 (Common Business Ontology)
- Instance: Entry-012 (AI Visibility Marketing)
- Recommendation: EXTEND Entry-012 if similar scope
```

### Query by Domain
```
Input: domain="marketing"
Output:
- System tenant: Common entities
- marketing-jv tenant: All marketing ontologies
- Recommendation: REUSE Organization, Person from system
```

### Duplicate Detection
```
If >70% entity overlap with existing → Warn
If >90% overlap → Flag as likely duplicate
Require explicit confirmation to proceed
```

---

## Change Control Format

```json
{
  "changeControl": {
    "controlledBy": "OAA Registry Change Control Board",
    "documentId": "OAA-PROMPT-v3.0.0",
    "changeHistory": [
      {
        "version": "3.0.0",
        "date": "2025-11-16",
        "changeType": "major",
        "changedBy": "Amanda Moore",
        "approvedBy": "Registry Control Board",
        "changes": [
          "Added competency validation framework",
          "Added quality completeness gates (100% requirements)",
          ...
        ],
        "rationale": "Enable UI integration and production-grade validation",
        "breakingChanges": false,
        "migrationRequired": false
      }
    ],
    "nextReviewDate": "2025-12-16",
    "status": "active"
  }
}
```

---

## Key Differences: v1.1 → v3.0

| Feature | v1.1 MVP | v3.0 Production |
|---------|----------|-----------------|
| Quality Gates | ≥95% thresholds | 100% completeness gates |
| Competency Validation | ❌ None | ✅ Domain-specific requirements |
| UI Integration | ❌ No | ✅ Structured JSON I/O |
| Registry Query | ❌ Manual | ✅ Automated lookup |
| Duplicate Detection | ❌ No | ✅ Similarity scoring |
| Incremental Validation | ❌ No | ✅ Support iterative refinement |
| Change Control | Basic versioning | Full what/why/who tracking |

---

## Error Handling Examples

### Completeness Gate Failure
```
"Conversion mapped successfully, but completeness gates failed:
- GATE 1 FAIL: 1 entity missing description (Campaign)
- GATE 2 PASS: All relationships have cardinality
- GATE 3 PASS: All business rules formatted correctly
- GATE 4 FAIL: 1 property missing rationale (Campaign.internalCode)

Please add description for Campaign entity and rationale for internalCode property."
```

### Competency Failure
```
"Marketing ontology does not meet competency requirements:
- Missing Entities: Audience, Channel (2/5)
- Missing Relationships: Campaign-targets-Audience (1/4)
- Competency Score: 60% (requires ≥90%)

Add these entities and relationships to meet marketing domain competency."
```

### Duplicate Warning
```
"Found existing ontology with 75% similarity (Entry-012):
- Shared entities: Campaign, Audience, Content
- Recommendation: EXTEND Entry-012 instead of creating new
- Confirm: Type 'create new anyway' to proceed with duplicate"
```

---

## Integration Workflow: NextJS Module

### Step 1: Capture UI Input
```typescript
const ontologyData = {
  mode: "incremental",
  ontologyId: workInProgressId,
  domain: selectedDomain,
  entities: [...],
  relationships: [...],
  businessRules: [...]
};
```

### Step 2: Call OAA Agent
```typescript
const response = await oaaAgent.validate(ontologyData);
```

### Step 3: Display Results
```typescript
<ValidationDashboard 
  errors={response.validationResults.errors}
  warnings={response.validationResults.warnings}
  qualityMetrics={response.qualityMetrics}
  competencyStatus={response.competencyStatus}
  recommendations={response.recommendations}
/>
```

### Step 4: Iterative Refinement
User fixes issues → Resubmit → Receive updated metrics → Repeat until ready

### Step 5: Final Validation
```typescript
const finalResponse = await oaaAgent.validate({
  mode: "complete",
  ontologyId: workInProgressId,
  ...
});

if (finalResponse.status === "complete") {
  // All gates passed - generate Registry v3.0 entry
  const registryEntry = finalResponse.registryEntry;
}
```

---

## Files & Structure

```
1 PF OAA/1 OAA-Arch-Reg-Deploy-Test/
├── oaa-system-prompt-v1.1-mvp.txt        # Previous version (MVP)
├── oaa-system-prompt-v3.0.0.txt          # NEW: Production-ready v3.0
├── OAA-v3.0.0-QUICK-START.md             # This file
└── [other OAA documentation]
```

---

## Next Steps

1. **Use OAA v3.0.0 for new ontologies** - Gets competency validation + 100% gates
2. **Convert existing v2.0 ontologies** - Upgrade to production-ready format
3. **Integrate with NextJS UI** - Use structured JSON I/O for interactive ontology building
4. **Query registry before creating** - Reuse PF-Core entities, avoid duplicates
5. **Track all changes** - Use changelog format with what/why/who

---

## Support & Resources

- **System Prompt:** `oaa-system-prompt-v3.0.0.txt`
- **Registry Guide:** `registry-operational-guide-v3.md`
- **Test Suite:** `OAA-TEST-Suite/oaa-test-suite-mvp.md`
- **BAIV Workflow:** `BAIV-MVP-WORKFLOW.md`
- **Repository WARP Guide:** `WARP.md`

---

**Last Updated:** 2025-11-16  
**Maintainer:** Amanda Moore  
**Registry Version:** 3.0.0  
**OAA Version:** 3.0.0
