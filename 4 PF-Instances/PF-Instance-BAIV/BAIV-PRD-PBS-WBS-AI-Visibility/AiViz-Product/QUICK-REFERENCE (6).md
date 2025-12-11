# AI VISIBILITY SCORECARD FRAMEWORK
# QUICK REFERENCE GUIDE v1.0.0

*Fast lookup for all 37 entities across 8 ontologies*

---

## ONTOLOGY 1: AI VISIBILITY ASSESSMENT

### AIVisibilityAssessment
**Purpose**: Core measurement of AI visibility across 5 dimensions
**Key Properties**: assessmentId, overallScore, tier, assessmentDate
**Relationships**: assesses → CustomerOrganization, hasDimensionalScore → DimensionalAssessment

### DimensionalAssessment
**Purpose**: Score for a specific dimension
**Key Properties**: dimensionName, dimensionScore, dimensionWeight
**Relationships**: hasIndicator → DimensionalIndicator

### DimensionalIndicator
**Purpose**: Individual metric within a dimension
**Key Properties**: indicatorName, indicatorValue, indicatorWeight
**Relationships**: (child of DimensionalAssessment)

### CompetitivePosition
**Purpose**: Relative market standing
**Key Properties**: marketRank, tierPosition, percentileRank
**Relationships**: comparesTo → CompetitorComparison

### CompetitorComparison
**Purpose**: Comparison to specific competitor
**Key Properties**: competitorName, scoreDifferential, analysis
**Relationships**: (child of CompetitivePosition)

---

## ONTOLOGY 2: CUSTOMER ORGANIZATION PROFILE

### CustomerOrganization
**Purpose**: Complete profile of customer company
**Key Properties**: organizationId, legalName, industryVertical, employeeCount, annualRevenue
**Relationships**: hasBeenAssessed, hasContact, hasAIContext, hasStrategicProfile

### AIMaturityContext
**Purpose**: AI adoption and maturity level
**Key Properties**: maturityLevel, aiCapabilities, adoptionStage
**Relationships**: (owned by CustomerOrganization)

### StrategicProfile
**Purpose**: Business objectives and priorities
**Key Properties**: strategicObjectives, competitivePriorities, budget
**Relationships**: (owned by CustomerOrganization)

### ContactPoint
**Purpose**: Key stakeholder information
**Key Properties**: contactName, role, email, phone
**Relationships**: (owned by CustomerOrganization)

---

## ONTOLOGY 3: GAP ANALYSIS & DIAGNOSIS

### GapAnalysis
**Purpose**: Complete gap identification from assessment
**Key Properties**: analysisId, analysisDate, totalGapsIdentified
**Relationships**: basedOn → AIVisibilityAssessment, identifiesGap → Gap

### Gap
**Purpose**: Specific deficiency identified
**Key Properties**: gapId, dimensionName, currentScore, targetScore, gapSize
**Relationships**: addresses → ImprovementOpportunity, causedBy → RootCause

### ImprovementOpportunity
**Purpose**: Actionable improvement with priority
**Key Properties**: opportunityId, opportunityTitle, priorityScore, impactScore, feasibilityScore
**Relationships**: addresses → Gap

### DiagnosticFinding
**Purpose**: Detailed diagnostic observation
**Key Properties**: findingId, category, severity, recommendation
**Relationships**: (child of GapAnalysis)

### RootCause
**Purpose**: Underlying cause of gap
**Key Properties**: causeId, causeCategory, description
**Relationships**: (child of Gap)

### CompetitiveGap
**Purpose**: Gap relative to competitors
**Key Properties**: competitorName, theirScore, ourScore, differential
**Relationships**: (child of Gap)

---

## ONTOLOGY 4: 30-DAY ACTION PLAN

### ActionPlan
**Purpose**: 30-day structured improvement plan
**Key Properties**: planId, planName, startDate, endDate, totalActions
**Relationships**: basedOn → GapAnalysis, addresses → ImprovementOpportunity, contains → PrescribedAction, organizedInto → ActionWeek

### PrescribedAction
**Purpose**: Specific action for customer to execute
**Key Properties**: actionId, actionTitle, actionType, effort, targetCompletionDate
**Relationships**: produces → Deliverable, scheduledIn → ActionWeek, dependsOn → PrescribedAction

### ActionWeek
**Purpose**: Weekly grouping of actions
**Key Properties**: weekNumber, weekTheme, weekFocus
**Relationships**: (child of ActionPlan)

### Deliverable
**Purpose**: Expected output from action
**Key Properties**: deliverableId, deliverableTitle, deliverableType, format
**Relationships**: (child of PrescribedAction)

---

## ONTOLOGY 5: IMPLEMENTATION TRACKING

### ActionExecution
**Purpose**: Actual implementation record
**Key Properties**: executionId, actualStartDate, actualCompletionDate, executionStatus, qualityScore
**Relationships**: tracks → PrescribedAction, hasEvidence → CompletionEvidence, hasBlocker → Blocker

### VarianceReport
**Purpose**: Plan vs actual analysis
**Key Properties**: reportId, reportDate, overallExecutionRate, onTrackActions, atRiskActions
**Relationships**: tracks → ActionPlan

### CompletionEvidence
**Purpose**: Proof of completion
**Key Properties**: evidenceId, evidenceType, evidenceUrl, verificationDate
**Relationships**: (child of ActionExecution)

### Blocker
**Purpose**: Issue preventing progress
**Key Properties**: blockerId, blockerType, severity, status, resolutionDate
**Relationships**: (child of ActionExecution)

---

## ONTOLOGY 6: PROGRESS MEASUREMENT

### FollowUpAssessment
**Purpose**: 30-day re-assessment
**Key Properties**: followUpId, followUpDate, newOverallScore, newTier
**Relationships**: follows → AIVisibilityAssessment, analyzes → ActionPlan

### ProgressReport
**Purpose**: Improvement analysis
**Key Properties**: reportId, reportDate, reportingPeriod, overallImprovement
**Relationships**: compares → FollowUpAssessment, measures → DeltaMeasurement, analyzes → TrendAnalysis

### DeltaMeasurement
**Purpose**: Before/after score changes
**Key Properties**: dimensionName, beforeScore, afterScore, deltaPoints, deltaPercentage
**Relationships**: (child of ProgressReport)

### TrendAnalysis
**Purpose**: Pattern and trajectory detection
**Key Properties**: trendType, trendStrength, momentum, predictedContinuation
**Relationships**: (child of ProgressReport)

---

## ONTOLOGY 7: FORECASTING & TRAJECTORY

### Forecast
**Purpose**: Future score projections
**Key Properties**: forecastId, forecastDate, timeHorizon (90-day, 12-month), projectedScore, confidenceLevel
**Relationships**: basedOn → ProgressReport, projects → DimensionalProjection, includes → ScenarioAnalysis

### DimensionalProjection
**Purpose**: Per-dimension forecast
**Key Properties**: dimensionName, currentScore, projectedScore, projectedGain
**Relationships**: (child of Forecast)

### ScenarioAnalysis
**Purpose**: Best/expected/worst case
**Key Properties**: scenarioType, probability, projectedScore, assumptions
**Relationships**: (child of Forecast)

### MilestoneProjection
**Purpose**: Future achievement predictions
**Key Properties**: milestoneDescription, projectedDate, likelihood, requirements
**Relationships**: (child of Forecast)

### TrajectoryModel
**Purpose**: Growth curve modeling
**Key Properties**: modelType, growthRate, acceleration, plateauPrediction
**Relationships**: (child of Forecast)

---

## ONTOLOGY 8: CONVERSION & SUBSCRIPTION

### DemoResults
**Purpose**: 30-day sprint outcomes
**Key Properties**: demoId, startScore, endScore, improvement, customerSatisfaction
**Relationships**: basedOn → ProgressReport, supports → ConversionOffer, generates → SuccessStory

### ConversionOffer
**Purpose**: Sales offer based on demo
**Key Properties**: offerId, offerTitle, offerType, validUntil
**Relationships**: includes → SubscriptionPackage

### SubscriptionPackage
**Purpose**: Service tier definition
**Key Properties**: packageId, packageName, packageTier, duration, price
**Relationships**: (child of ConversionOffer)

### SuccessStory
**Purpose**: Before/after narrative
**Key Properties**: storyId, storyTitle, beforeState, afterState, keyOutcomes
**Relationships**: (child of DemoResults)

### Subscription
**Purpose**: Active customer subscription
**Key Properties**: subscriptionId, subscriptionStatus, startDate, renewalDate, mrr
**Relationships**: subscribesTo → SubscriptionPackage, subscribedBy → CustomerOrganization

---

## KEY ENTITY RELATIONSHIPS

```
Customer Journey Flow:
CustomerOrganization
  ↓ (hasBeenAssessed)
AIVisibilityAssessment (BASELINE)
  ↓ (basedOn)
GapAnalysis → Gap → ImprovementOpportunity
  ↓ (addresses)
ActionPlan → PrescribedAction → Deliverable
  ↓ (tracks)
ActionExecution → VarianceReport
  ↓ (follows)
FollowUpAssessment → ProgressReport → DeltaMeasurement
  ↓ (basedOn)
Forecast → DimensionalProjection → ScenarioAnalysis
  ↓ (basedOn)
DemoResults → ConversionOffer → SubscriptionPackage
  ↓ (subscribesTo)
Subscription
```

---

## COMMON PROPERTY PATTERNS

### Identifiers (Required)
- All entities have: `{entity}Id` (Text, unique)
- Examples: assessmentId, organizationId, gapId, actionId

### Temporal (Common)
- Created: `createdDate`, `assessmentDate`, `analysisDate`
- Modified: `lastModified`
- Scheduled: `targetDate`, `dueDate`, `completionDate`
- Actual: `actualStartDate`, `actualCompletionDate`

### Scoring (0-100 scale)
- Overall scores: `overallScore`, `dimensionScore`, `priorityScore`
- Improvements: `deltaPoints`, `deltaPercentage`, `improvement`
- Forecasts: `projectedScore`, `confidenceLevel`

### Status Enumerations
- Assessment: Draft | In Progress | Completed | Archived
- Execution: Not Started | In Progress | Completed | On Hold | Blocked
- Forecast: Active | Achieved | Superseded | Invalidated
- Subscription: Active | Paused | Cancelled | Expired

### Classification
- Dimensions: Market Perception | AI Maturity | Competitive Position | Readiness | Growth
- Tiers: Emerging (0-20) | Building (21-40) | Scaling (41-60) | Market Leader (61-80) | Thought Leader (81-100)
- Actions: Content Creation | Technical Development | Relationship Building | Strategic Planning | Marketing

---

## QUICK LOOKUP: ENTITIES BY USE CASE

### Assessment & Measurement
AIVisibilityAssessment, DimensionalAssessment, DimensionalIndicator, CompetitivePosition, FollowUpAssessment

### Customer Management
CustomerOrganization, AIMaturityContext, StrategicProfile, ContactPoint

### Gap Identification
GapAnalysis, Gap, ImprovementOpportunity, DiagnosticFinding, RootCause, CompetitiveGap

### Planning & Execution
ActionPlan, PrescribedAction, ActionWeek, Deliverable, ActionExecution

### Tracking & Reporting
VarianceReport, CompletionEvidence, Blocker, ProgressReport, DeltaMeasurement, TrendAnalysis

### Forecasting
Forecast, DimensionalProjection, ScenarioAnalysis, MilestoneProjection, TrajectoryModel

### Conversion
DemoResults, ConversionOffer, SubscriptionPackage, SuccessStory, Subscription

---

## PROPERTY COUNT BY ENTITY

| Entity | Properties | Complexity |
|--------|-----------|------------|
| Subscription | 24 | High |
| ConversionOffer | 23 | High |
| DemoResults | 22 | High |
| CustomerOrganization | 19 | High |
| Forecast | 18 | Medium-High |
| ProgressReport | 18 | Medium-High |
| VarianceReport | 17 | Medium-High |
| ActionExecution | 16 | Medium |
| AIVisibilityAssessment | 13 | Medium |
| ActionPlan | 13 | Medium |
| GapAnalysis | 12 | Medium |
| FollowUpAssessment | 12 | Medium |
| PrescribedAction | 12 | Medium |
| ImprovementOpportunity | 11 | Medium |
| Gap | 10 | Medium |
| Others | 4-10 | Low-Medium |

---

## RELATIONSHIP CARDINALITY RULES

### One-to-One (1..1)
- AIVisibilityAssessment → CustomerOrganization (assesses)
- FollowUpAssessment → AIVisibilityAssessment (follows)

### One-to-Many (1..*)
- AIVisibilityAssessment → DimensionalAssessment (hasDimensionalScore)
- ActionPlan → PrescribedAction (contains)
- PrescribedAction → Deliverable (produces)

### Many-to-One (*..)
- Gap → ImprovementOpportunity (addresses)
- PrescribedAction → Gap (addresses)

### Many-to-Many (*..*)
- PrescribedAction → PrescribedAction (dependsOn)

---

## VALIDATION QUICK CHECKS

### Required Fields
- Every entity must have: `{entity}Id`, `name`/`title`, `status`
- Assessment entities must have: `score`, `date`
- Plan entities must have: `startDate`, `endDate`
- Execution entities must have: `status`, dates

### Score Ranges
- All scores: 0-100 (inclusive)
- Weights must sum to 100
- Percentages: 0-100
- Ratings: 1-5

### Date Logic
- endDate >= startDate
- actualCompletionDate >= actualStartDate
- followUpDate > assessmentDate (typically +30 days)

### Status Transitions
- Draft → In Progress → Completed (no skipping)
- Cannot go from Completed back to In Progress without explicit reason
- Archived is terminal state

---

*For complete specifications, see: ai-visibility-glossary-comprehensive-v1.0.0.json*
*For detailed documentation, see: ai-visibility-glossary-comprehensive-v1.0.0.md*

**AI Visibility Scorecard Framework | Quick Reference v1.0.0 | BAIV Ltd**
