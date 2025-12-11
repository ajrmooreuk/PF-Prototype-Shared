# PF-Core: VE Value Proposition GLO v1.0.0

## Value Proposition Development Framework Glossary

*Ontology Reference Documentation*

---

| | |
|---------------------|-------|
| **Document ID** | PF-Core_VE_ValueProposition_Glossary_v1.0.0 |
| **Document Type** | GLO (Glossary) |
| **Version** | 1.0.0 |
| **Last Updated** | December 2025 |
| **Ontology Reference** | pf-core:ontology:value-proposition-v1 |
| **Platform** | BAIV Agentic Platform |

---

## Core Entities

### ValueProposition
**Definition:** A clear statement of how a product, service, or initiative creates value for a specific customer segment by addressing their pain points and delivering measurable benefits.

**Usage:** The central entity that connects customer segments, problems, value drivers, and differentiators into a cohesive value story.

**Key Properties:**
- `propositionId` - Unique identifier (e.g., VP-2025-001)
- `propositionStatement` - Full value proposition using IF-FOR-THEN-BECAUSE format
- `propositionType` - Product, Service, Project, Process, or Initiative
- `validationStatus` - Hypothesis, Tested, Validated, Invalidated, Refined

**Example:**
```json
{
  "propositionStatement": "IF we provide AI visibility monitoring FOR mid-market CMOs THEN they achieve 30% citation improvement BECAUSE our semantic optimization aligns with AI processing"
}
```

---

### CustomerSegment
**Definition:** A defined group of potential customers with shared characteristics, needs, and behaviors.

**Usage:** Defines who the value proposition is designed for, including their decision-making structure and pain points.

**Key Properties:**
- `segmentName` - Human-readable segment identifier
- `industry` - Target industry/industries
- `companySize` - Startup, SMB, Mid-Market, Enterprise, Global Enterprise
- `decisionMakers` - Roles involved in purchase decisions
- `influencers` - Roles that influence but don't make final decisions
- `painPoints` - Collection of specific frustrations or challenges

**Related To:** PainPoint, CustomerGoal

---

### ProblemDefinition
**Definition:** A structured definition of the problem or challenge that the value proposition addresses.

**Usage:** Captures the problem using the format: [TARGET] struggles with [CHALLENGE] when trying to [OUTCOME], resulting in [CONSEQUENCES].

**Key Properties:**
- `problemStatement` - Structured problem articulation
- `problemCategory` - Functional, Economic, Emotional, Social, Strategic
- `severity` - Critical, High, Medium, Low
- `frequency` - How often the problem occurs
- `consequences` - Negative outcomes from unsolved problem
- `currentSolutions` - How the problem is currently addressed

**Business Rule:** Critical severity problems must have at least one documented consequence.

---

### PainPoint
**Definition:** A specific frustration, challenge, or unmet need experienced by a customer segment.

**Usage:** Detailed capture of customer frustrations that the value proposition aims to address.

**Key Properties:**
- `painPointDescription` - Clear description of the pain
- `painType` - Economic, Functional, Emotional, Social, Process
- `intensity` - 1-10 scale of pain severity
- `willingnessToPayToSolve` - Very High, High, Medium, Low, None

**Relationship:** CustomerSegment must have at least one PainPoint.

---

### ValueDriver
**Definition:** A specific way in which the solution creates value for the customer.

**Usage:** Articulates the value creation mechanism with quantifiable or qualitative outcomes.

**Key Properties:**
- `driverType` - Cost Reduction, Revenue Growth, Risk Mitigation, Efficiency Gain, Capability Enhancement, Competitive Advantage
- `quantifiableValue` - Measurable value with baseline, target, and timeframe
- `qualitativeValue` - Non-quantifiable value description
- `evidenceType` - Case Study, Metric, Testimonial, Benchmark, Research

---

### QuantifiableValue
**Definition:** A measurable value outcome with specific metrics.

**Usage:** Provides concrete, measurable evidence of value creation.

**Key Properties:**
- `metricName` - What is being measured
- `baselineValue` - Starting point
- `targetValue` - Goal
- `improvementPercentage` - Percentage change
- `unit` - Measurement unit
- `timeToValue` - Duration to achieve value (ISO 8601)

**Example:**
```json
{
  "metricName": "AI citation rate",
  "baselineValue": 5,
  "targetValue": 35,
  "improvementPercentage": 600,
  "unit": "citations per month",
  "timeToValue": "P90D"
}
```

---

### Differentiator
**Definition:** A unique characteristic that distinguishes the solution from alternatives.

**Usage:** Captures what makes the value proposition unique and sustainable.

**Key Properties:**
- `differentiatorType` - Feature, Technology, Methodology, Experience, Integration, Support, Pricing
- `competitiveGap` - What competitors cannot easily replicate
- `sustainabilityPeriod` - How long the advantage can be maintained
- `blueOceanStrategy` - Eliminate, Reduce, Raise, or Create

**Business Rule:** Differentiators with competitive gaps must specify sustainability period.

---

### Hypothesis
**Definition:** A testable assumption about the value proposition using IF-FOR-THEN-BECAUSE format.

**Usage:** Enables systematic validation of value proposition assumptions.

**Key Properties:**
- `ifComponent` - The solution or action being proposed
- `forComponent` - The target customer segment
- `thenComponent` - The expected outcome or benefit
- `becauseComponent` - The underlying rationale or mechanism
- `validationMethod` - Customer Interview, A/B Test, Prototype Test, Market Research, Pilot Program
- `validationStatus` - Untested, In Progress, Validated, Invalidated, Needs Refinement
- `confidenceLevel` - 0-100% confidence in hypothesis

**Business Rule:** All four components (IF, FOR, THEN, BECAUSE) are required.

---

### Consequence
**Definition:** A negative outcome resulting from the problem not being solved.

**Usage:** Captures the cost of inaction to strengthen value proposition urgency.

**Key Properties:**
- `consequenceDescription` - Description of the negative outcome
- `consequenceType` - Direct Cost, Opportunity Cost, Risk, Reputation, Compliance
- `estimatedImpact` - Monetary impact if quantifiable

---

### CurrentSolution
**Definition:** An existing approach or workaround used to address the problem.

**Usage:** Documents the competitive landscape and alternatives.

**Key Properties:**
- `solutionType` - Competitor Product, Manual Process, Internal Build, Status Quo, Workaround
- `gaps` - Limitations of the current solution
- `satisfactionLevel` - 1-10 satisfaction with current approach

---

### CustomerGoal
**Definition:** A desired outcome or objective that the customer wants to achieve.

**Usage:** Captures what success looks like from the customer's perspective.

**Key Properties:**
- `goalType` - Functional, Social, Emotional, Strategic
- `priority` - Critical, High, Medium, Low

---

## Blue Ocean Strategy Terms

### Eliminate
**Definition:** Features or factors that the industry takes for granted but create no real value.

**Usage:** Identify what to remove from traditional offerings.

### Reduce
**Definition:** Features or factors that should be reduced below industry standards.

**Usage:** Identify what to scale back to reduce cost/complexity.

### Raise
**Definition:** Features or factors that should be raised above industry standards.

**Usage:** Identify what to significantly improve.

### Create
**Definition:** Features or factors the industry has never offered.

**Usage:** Identify entirely new sources of value.

---

## Validation Statuses

| Status | Definition |
|--------|------------|
| **Hypothesis** | Initial assumption, not yet tested |
| **Untested** | Hypothesis formulated but no validation started |
| **In Progress** | Validation activities underway |
| **Tested** | Validation complete, results being analyzed |
| **Validated** | Evidence supports the hypothesis |
| **Invalidated** | Evidence contradicts the hypothesis |
| **Needs Refinement** | Partially validated, requires adjustment |
| **Refined** | Updated based on validation learnings |

---

## Integration Points

### VSOM Integration
Value propositions align with VSOM strategic objectives through the `vsomAlignment` property, ensuring that all value creation activities support organizational strategy.

### OKR Integration
Validated value propositions inform OKR objective setting, with value drivers feeding into key result targets.

### RACI/RBAC Integration
Customer segment decision makers map to organizational roles for context engineering and stakeholder analysis.

---

## Business Rules Summary

| Rule ID | Entity | Constraint |
|---------|--------|------------|
| BR-VP-001 | ValueProposition | Must have targetSegment, problemAddressed, and at least 1 valueDriver |
| BR-VP-002 | Hypothesis | All four IF-FOR-THEN-BECAUSE components required |
| BR-VP-003 | CustomerSegment | Must have at least 1 painPoint |
| BR-VP-004 | ProblemDefinition | Critical severity requires at least 1 consequence |
| BR-VP-005 | Differentiator | Competitive gap requires sustainability period |

---

*Generated by Ontology Architect Agent (OAA) v3.0*  
*Platform Foundation Core - Value Engineering Module*
