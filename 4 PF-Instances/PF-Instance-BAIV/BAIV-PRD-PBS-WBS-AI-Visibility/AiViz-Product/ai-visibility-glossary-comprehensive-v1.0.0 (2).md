# AI VISIBILITY SCORECARD FRAMEWORK
# COMPREHENSIVE GLOSSARY v1.0.0

*Complete terminology reference for all 8 ontologies*

---

## 📋 OVERVIEW

**Version**: 1.0.0
**Date Created**: 2025-10-13T19:36:05.274454
**Total Terms**: 492
- **Entities**: 37
- **Properties**: 420
- **Relationships**: 35

**Coverage Scope**:
- AI Visibility Assessment and Measurement
- Customer Organization Profiling
- Gap Analysis and Diagnosis
- 30-Day Action Planning
- Implementation Tracking and Variance
- Progress Measurement and Delta Analysis
- Forecasting and Trajectory Modeling
- Conversion and Subscription Management

---

## 📊 COVERAGE BY ONTOLOGY

| Ontology | Entities | Properties | Relationships |
|----------|----------|------------|---------------|
| AI Visibility Assessment | 5 | 38 | 4 |
| Customer Organization Profile | 4 | 43 | 4 |
| Gap Analysis & Diagnosis | 6 | 54 | 4 |
| 30-Day Action Plan | 4 | 52 | 7 |
| Implementation Tracking | 4 | 59 | 4 |
| Progress Measurement | 4 | 53 | 4 |
| Forecasting & Trajectory | 5 | 52 | 4 |
| Conversion & Subscription | 5 | 69 | 4 |

---

## 🏗️ ENTITIES

*37 core business entities across all ontologies*


### 30-Day Action Plan

#### **ActionPlan**

**Description**: 30-day improvement plan prescribing specific actions for customer to execute

**Term Code**: `entity-ActionPlan`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 20

**Business Meaning**: Business concept representing ActionPlan within the 30-Day Action Plan domain

**Technical Meaning**: JSON-LD entity of type ActionPlan with 20 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ActionPlan to manage 30-day improvement plan prescribing specific actions for customer to execute

**Properties List**:
- `planId`
- `planName`
- `organization`
- `baselineAssessment`
- `gapAnalysis`
- `planCreatedDate`
- `planCreator`
- `startDate`
- `endDate`
- `primaryObjective`
- *(and 10 more)*

---

#### **ActionWeek**

**Description**: Weekly structure organizing actions into logical phases

**Term Code**: `entity-ActionWeek`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 7

**Business Meaning**: Business concept representing ActionWeek within the 30-Day Action Plan domain

**Technical Meaning**: JSON-LD entity of type ActionWeek with 7 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ActionWeek to manage weekly structure organizing actions into logical phases

**Properties List**:
- `weekNumber`
- `weekTheme`
- `weekObjective`
- `startDate`
- `endDate`
- `actionsThisWeek`
- `keyMilestones`

---

#### **Deliverable**

**Description**: Tangible output produced by executing actions

**Term Code**: `entity-Deliverable`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 8

**Business Meaning**: Business concept representing Deliverable within the 30-Day Action Plan domain

**Technical Meaning**: JSON-LD entity of type Deliverable with 8 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of Deliverable to manage tangible output produced by executing actions

**Properties List**:
- `deliverableId`
- `deliverableName`
- `deliverableType`
- `description`
- `producedByAction`
- `dueDate`
- `qualityStandards`
- `visibilityImpact`

---

#### **PrescribedAction**

**Description**: Specific action customer must execute as part of the plan

**Term Code**: `entity-PrescribedAction`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 17

**Business Meaning**: Business concept representing PrescribedAction within the 30-Day Action Plan domain

**Technical Meaning**: JSON-LD entity of type PrescribedAction with 17 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of PrescribedAction to manage specific action customer must execute as part of the plan

**Properties List**:
- `actionId`
- `actionName`
- `actionDescription`
- `actionType`
- `priority`
- `scheduledDay`
- `week`
- `estimatedEffort`
- `owner`
- `dependencies`
- *(and 7 more)*

---


### AI Visibility Assessment

#### **AIVisibilityAssessment**

**Description**: Comprehensive evaluation of an organization's AI visibility and market positioning

**Term Code**: `entity-AIVisibilityAssessment`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 13

**Business Meaning**: Business concept representing AIVisibilityAssessment within the AI Visibility Assessment domain

**Technical Meaning**: JSON-LD entity of type AIVisibilityAssessment with 13 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of AIVisibilityAssessment to manage comprehensive evaluation of an organization's ai visibility and market positioning

**Properties List**:
- `assessmentId`
- `subject`
- `assessmentDate`
- `assessor`
- `overallScore`
- `tier`
- `dimensionalScores`
- `competitivePosition`
- `keyFindings`
- `opportunityScore`
- *(and 3 more)*

---

#### **CompetitivePosition**

**Description**: Analysis of organization's position relative to competitors

**Term Code**: `entity-CompetitivePosition`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 5

**Business Meaning**: Business concept representing CompetitivePosition within the AI Visibility Assessment domain

**Technical Meaning**: JSON-LD entity of type CompetitivePosition with 5 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of CompetitivePosition to manage analysis of organization's position relative to competitors

**Properties List**:
- `industrySegment`
- `percentileRank`
- `competitorComparisons`
- `marketLeaderGap`
- `positioningStatement`

---

#### **CompetitorComparison**

**Description**: Comparison to a specific competitor

**Term Code**: `entity-CompetitorComparison`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 5

**Business Meaning**: Business concept representing CompetitorComparison within the AI Visibility Assessment domain

**Technical Meaning**: JSON-LD entity of type CompetitorComparison with 5 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of CompetitorComparison to manage comparison to a specific competitor

**Properties List**:
- `competitor`
- `competitorScore`
- `scoreDelta`
- `dimensionalComparison`
- `keyDifferentiators`

---

#### **DimensionalAssessment**

**Description**: Score and analysis for one of the five AI visibility dimensions

**Term Code**: `entity-DimensionalAssessment`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 8

**Business Meaning**: Business concept representing DimensionalAssessment within the AI Visibility Assessment domain

**Technical Meaning**: JSON-LD entity of type DimensionalAssessment with 8 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of DimensionalAssessment to manage score and analysis for one of the five ai visibility dimensions

**Properties List**:
- `dimension`
- `score`
- `weight`
- `rating`
- `indicators`
- `gaps`
- `strengths`
- `recommendations`

---

#### **DimensionalIndicator**

**Description**: Specific measurable indicator within a dimension

**Term Code**: `entity-DimensionalIndicator`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 7

**Business Meaning**: Business concept representing DimensionalIndicator within the AI Visibility Assessment domain

**Technical Meaning**: JSON-LD entity of type DimensionalIndicator with 7 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of DimensionalIndicator to manage specific measurable indicator within a dimension

**Properties List**:
- `name`
- `score`
- `weight`
- `measurement`
- `currentValue`
- `targetValue`
- `evidence`

---


### Conversion & Subscription

#### **ConversionOffer**

**Description**: Offer to convert from demo to paid subscription

**Term Code**: `entity-ConversionOffer`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 13

**Business Meaning**: Business concept representing ConversionOffer within the Conversion & Subscription domain

**Technical Meaning**: JSON-LD entity of type ConversionOffer with 13 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ConversionOffer to manage offer to convert from demo to paid subscription

**Properties List**:
- `offerId`
- `organization`
- `demoResults`
- `offerDate`
- `validUntil`
- `recommendedPackage`
- `alternativePackages`
- `valueProposition`
- `projectedOutcomes`
- `forecast`
- *(and 3 more)*

---

#### **DemoResults**

**Description**: Summary of results from 30-day demonstration sprint, proving value delivered

**Term Code**: `entity-DemoResults`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 20

**Business Meaning**: Business concept representing DemoResults within the Conversion & Subscription domain

**Technical Meaning**: JSON-LD entity of type DemoResults with 20 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of DemoResults to manage summary of results from 30-day demonstration sprint, proving value delivered

**Properties List**:
- `demoId`
- `organization`
- `actionPlan`
- `progressReport`
- `demoStartDate`
- `demoEndDate`
- `baselineScore`
- `finalScore`
- `scoreImprovement`
- `percentImprovement`
- *(and 10 more)*

---

#### **Subscription**

**Description**: Active subscription record

**Term Code**: `entity-Subscription`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 8

**Business Meaning**: Business concept representing Subscription within the Conversion & Subscription domain

**Technical Meaning**: JSON-LD entity of type Subscription with 8 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of Subscription to manage active subscription record

**Properties List**:
- `subscriptionId`
- `organization`
- `package`
- `startDate`
- `endDate`
- `status`
- `autoRenewal`
- `conversionSource`

---

#### **SubscriptionPackage**

**Description**: Ongoing subscription service package

**Term Code**: `entity-SubscriptionPackage`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 13

**Business Meaning**: Business concept representing SubscriptionPackage within the Conversion & Subscription domain

**Technical Meaning**: JSON-LD entity of type SubscriptionPackage with 13 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of SubscriptionPackage to manage ongoing subscription service package

**Properties List**:
- `packageId`
- `packageName`
- `packageTier`
- `duration`
- `pricingModel`
- `monthlyFee`
- `servicesIncluded`
- `deliveryFrequency`
- `supportLevel`
- `expectedOutcomes`
- *(and 3 more)*

---

#### **SuccessStory**

**Description**: Customer success story for marketing and sales use

**Term Code**: `entity-SuccessStory`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 15

**Business Meaning**: Business concept representing SuccessStory within the Conversion & Subscription domain

**Technical Meaning**: JSON-LD entity of type SuccessStory with 15 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of SuccessStory to manage customer success story for marketing and sales use

**Properties List**:
- `storyId`
- `organization`
- `demoResults`
- `storyTitle`
- `executiveSummary`
- `challenge`
- `solution`
- `results`
- `impactMetrics`
- `customerQuote`
- *(and 5 more)*

---


### Customer Organization Profile

#### **AIMaturityContext**

**Description**: Current state of AI adoption and maturity

**Term Code**: `entity-AIMaturityContext`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 10

**Business Meaning**: Business concept representing AIMaturityContext within the Customer Organization Profile domain

**Technical Meaning**: JSON-LD entity of type AIMaturityContext with 10 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of AIMaturityContext to manage current state of ai adoption and maturity

**Properties List**:
- `maturityStage`
- `activeAIProjects`
- `aiInProduction`
- `aiTeamSize`
- `aiToolsUsed`
- `primaryAIUseCases`
- `aiStrategy`
- `aiInvestmentLevel`
- `dataMaturityLevel`
- `keyAIChallenges`

---

#### **ContactPoint**

**Description**: Contact information for engagement

**Term Code**: `entity-ContactPoint`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 6

**Business Meaning**: Business concept representing ContactPoint within the Customer Organization Profile domain

**Technical Meaning**: JSON-LD entity of type ContactPoint with 6 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ContactPoint to manage contact information for engagement

**Properties List**:
- `contactType`
- `name`
- `jobTitle`
- `email`
- `telephone`
- `linkedInProfile`

---

#### **CustomerOrganization**

**Description**: Organization seeking to improve AI visibility and market positioning

**Term Code**: `entity-CustomerOrganization`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 19

**Business Meaning**: Business concept representing CustomerOrganization within the Customer Organization Profile domain

**Technical Meaning**: JSON-LD entity of type CustomerOrganization with 19 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of CustomerOrganization to manage organization seeking to improve ai visibility and market positioning

**Properties List**:
- `organizationId`
- `legalName`
- `tradingName`
- `industry`
- `industrySector`
- `numberOfEmployees`
- `companySize`
- `annualRevenue`
- `headquartersLocation`
- `operatingRegions`
- *(and 9 more)*

---

#### **StrategicProfile**

**Description**: Strategic objectives and priorities for AI visibility improvement

**Term Code**: `entity-StrategicProfile`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 8

**Business Meaning**: Business concept representing StrategicProfile within the Customer Organization Profile domain

**Technical Meaning**: JSON-LD entity of type StrategicProfile with 8 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of StrategicProfile to manage strategic objectives and priorities for ai visibility improvement

**Properties List**:
- `primaryObjective`
- `targetMarket`
- `competitiveGoals`
- `timeHorizon`
- `investmentCapacity`
- `executionCapacity`
- `priorityDimensions`
- `successMetrics`

---


### Forecasting & Trajectory

#### **DimensionalProjection**

**Description**: Forecast for a specific visibility dimension

**Term Code**: `entity-DimensionalProjection`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 8

**Business Meaning**: Business concept representing DimensionalProjection within the Forecasting & Trajectory domain

**Technical Meaning**: JSON-LD entity of type DimensionalProjection with 8 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of DimensionalProjection to manage forecast for a specific visibility dimension

**Properties List**:
- `dimension`
- `currentScore`
- `projectedScore`
- `projectedDelta`
- `growthRate`
- `confidenceLevel`
- `plannedInitiatives`
- `keyDrivers`

---

#### **Forecast**

**Description**: Projection of future AI visibility score and positioning

**Term Code**: `entity-Forecast`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 19

**Business Meaning**: Business concept representing Forecast within the Forecasting & Trajectory domain

**Technical Meaning**: JSON-LD entity of type Forecast with 19 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of Forecast to manage projection of future ai visibility score and positioning

**Properties List**:
- `forecastId`
- `organization`
- `baselineAssessment`
- `forecastDate`
- `forecastHorizon`
- `targetDate`
- `currentScore`
- `projectedScore`
- `projectedDelta`
- `currentTier`
- *(and 9 more)*

---

#### **MilestoneProjection**

**Description**: Projected milestone along the trajectory

**Term Code**: `entity-MilestoneProjection`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 7

**Business Meaning**: Business concept representing MilestoneProjection within the Forecasting & Trajectory domain

**Technical Meaning**: JSON-LD entity of type MilestoneProjection with 7 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of MilestoneProjection to manage projected milestone along the trajectory

**Properties List**:
- `milestoneId`
- `milestoneName`
- `targetDate`
- `projectedScore`
- `significance`
- `requirements`
- `indicators`

---

#### **ScenarioAnalysis**

**Description**: Analysis of different outcome scenarios

**Term Code**: `entity-ScenarioAnalysis`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 8

**Business Meaning**: Business concept representing ScenarioAnalysis within the Forecasting & Trajectory domain

**Technical Meaning**: JSON-LD entity of type ScenarioAnalysis with 8 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ScenarioAnalysis to manage analysis of different outcome scenarios

**Properties List**:
- `scenarioName`
- `probability`
- `projectedScore`
- `projectedTier`
- `scenarioNarrative`
- `requiredConditions`
- `investmentRequired`
- `timeToAchieve`

---

#### **TrajectoryModel**

**Description**: Mathematical model of expected growth trajectory

**Term Code**: `entity-TrajectoryModel`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 10

**Business Meaning**: Business concept representing TrajectoryModel within the Forecasting & Trajectory domain

**Technical Meaning**: JSON-LD entity of type TrajectoryModel with 10 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of TrajectoryModel to manage mathematical model of expected growth trajectory

**Properties List**:
- `modelId`
- `organization`
- `modelType`
- `baselineData`
- `growthRatePerMonth`
- `accelerationFactor`
- `ceiling`
- `confidenceInterval`
- `r2Score`
- `assumptions`

---


### Gap Analysis & Diagnosis

#### **CompetitiveGap**

**Description**: Gap relative to a specific competitor

**Term Code**: `entity-CompetitiveGap`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 6

**Business Meaning**: Business concept representing CompetitiveGap within the Gap Analysis & Diagnosis domain

**Technical Meaning**: JSON-LD entity of type CompetitiveGap with 6 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of CompetitiveGap to manage gap relative to a specific competitor

**Properties List**:
- `competitor`
- `gapArea`
- `theirStrength`
- `ourPosition`
- `scoreDelta`
- `closeability`

---

#### **DiagnosticFinding**

**Description**: Specific finding from diagnostic analysis

**Term Code**: `entity-DiagnosticFinding`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 6

**Business Meaning**: Business concept representing DiagnosticFinding within the Gap Analysis & Diagnosis domain

**Technical Meaning**: JSON-LD entity of type DiagnosticFinding with 6 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of DiagnosticFinding to manage specific finding from diagnostic analysis

**Properties List**:
- `findingId`
- `findingType`
- `finding`
- `evidence`
- `implications`
- `confidence`

---

#### **Gap**

**Description**: Specific gap between current and desired state

**Term Code**: `entity-Gap`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 10

**Business Meaning**: Business concept representing Gap within the Gap Analysis & Diagnosis domain

**Technical Meaning**: JSON-LD entity of type Gap with 10 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of Gap to manage specific gap between current and desired state

**Properties List**:
- `gapId`
- `dimension`
- `gapName`
- `gapDescription`
- `currentState`
- `desiredState`
- `gapMagnitude`
- `severity`
- `impactOnScore`
- `relatedIndicators`

---

#### **GapAnalysis**

**Description**: Comprehensive analysis of gaps between current state and desired state

**Term Code**: `entity-GapAnalysis`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 13

**Business Meaning**: Business concept representing GapAnalysis within the Gap Analysis & Diagnosis domain

**Technical Meaning**: JSON-LD entity of type GapAnalysis with 13 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of GapAnalysis to manage comprehensive analysis of gaps between current state and desired state

**Properties List**:
- `analysisId`
- `baselineAssessment`
- `organization`
- `analysisDate`
- `analyst`
- `gapsIdentified`
- `opportunitiesIdentified`
- `priorityOpportunities`
- `diagnosticFindings`
- `competitiveGaps`
- *(and 3 more)*

---

#### **ImprovementOpportunity**

**Description**: Specific opportunity to improve AI visibility

**Term Code**: `entity-ImprovementOpportunity`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 13

**Business Meaning**: Business concept representing ImprovementOpportunity within the Gap Analysis & Diagnosis domain

**Technical Meaning**: JSON-LD entity of type ImprovementOpportunity with 13 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ImprovementOpportunity to manage specific opportunity to improve ai visibility

**Properties List**:
- `opportunityId`
- `addressesGaps`
- `opportunityName`
- `opportunityDescription`
- `category`
- `impactScore`
- `feasibility`
- `priorityScore`
- `timeToValue`
- `estimatedEffort`
- *(and 3 more)*

---

#### **RootCause**

**Description**: Root cause analysis for identified gaps

**Term Code**: `entity-RootCause`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 6

**Business Meaning**: Business concept representing RootCause within the Gap Analysis & Diagnosis domain

**Technical Meaning**: JSON-LD entity of type RootCause with 6 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of RootCause to manage root cause analysis for identified gaps

**Properties List**:
- `causeId`
- `affectsGaps`
- `causeDescription`
- `causeCategory`
- `addressabilityScore`
- `recommendedActions`

---


### Implementation Tracking

#### **ActionExecution**

**Description**: Record of actual execution of a prescribed action

**Term Code**: `entity-ActionExecution`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 21

**Business Meaning**: Business concept representing ActionExecution within the Implementation Tracking domain

**Technical Meaning**: JSON-LD entity of type ActionExecution with 21 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ActionExecution to manage record of actual execution of a prescribed action

**Properties List**:
- `executionId`
- `prescribedAction`
- `executionStatus`
- `plannedStartDate`
- `actualStartDate`
- `plannedCompletionDate`
- `actualCompletionDate`
- `startDateVariance`
- `completionDateVariance`
- `percentComplete`
- *(and 11 more)*

---

#### **Blocker**

**Description**: Issue blocking action execution

**Term Code**: `entity-Blocker`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 11

**Business Meaning**: Business concept representing Blocker within the Implementation Tracking domain

**Technical Meaning**: JSON-LD entity of type Blocker with 11 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of Blocker to manage issue blocking action execution

**Properties List**:
- `blockerId`
- `blockerType`
- `blockerDescription`
- `severity`
- `identifiedDate`
- `status`
- `owner`
- `mitigationPlan`
- `targetResolutionDate`
- `actualResolutionDate`
- *(and 1 more)*

---

#### **CompletionEvidence**

**Description**: Proof that an action was completed

**Term Code**: `entity-CompletionEvidence`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 6

**Business Meaning**: Business concept representing CompletionEvidence within the Implementation Tracking domain

**Technical Meaning**: JSON-LD entity of type CompletionEvidence with 6 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of CompletionEvidence to manage proof that an action was completed

**Properties List**:
- `evidenceId`
- `evidenceType`
- `evidenceDescription`
- `evidenceURL`
- `captureDate`
- `verifiedBy`

---

#### **VarianceReport**

**Description**: Analysis of plan vs actual variance for an action plan

**Term Code**: `entity-VarianceReport`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 21

**Business Meaning**: Business concept representing VarianceReport within the Implementation Tracking domain

**Technical Meaning**: JSON-LD entity of type VarianceReport with 21 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of VarianceReport to manage analysis of plan vs actual variance for an action plan

**Properties List**:
- `reportId`
- `actionPlan`
- `reportDate`
- `reportingPeriod`
- `overallExecutionRate`
- `actionsCompleted`
- `actionsInProgress`
- `actionsDelayed`
- `actionsBlocked`
- `actionsNotStarted`
- *(and 11 more)*

---


### Progress Measurement

#### **DeltaMeasurement**

**Description**: Measurement of change between baseline and follow-up

**Term Code**: `entity-DeltaMeasurement`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 12

**Business Meaning**: Business concept representing DeltaMeasurement within the Progress Measurement domain

**Technical Meaning**: JSON-LD entity of type DeltaMeasurement with 12 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of DeltaMeasurement to manage measurement of change between baseline and follow-up

**Properties List**:
- `measurementId`
- `measurementType`
- `dimension`
- `baselineValue`
- `followUpValue`
- `absoluteDelta`
- `percentChange`
- `direction`
- `significance`
- `contributingActions`
- *(and 2 more)*

---

#### **FollowUpAssessment**

**Description**: Re-assessment after 30-day action plan execution to measure improvement

**Term Code**: `entity-FollowUpAssessment`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 11

**Business Meaning**: Business concept representing FollowUpAssessment within the Progress Measurement domain

**Technical Meaning**: JSON-LD entity of type FollowUpAssessment with 11 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of FollowUpAssessment to manage re-assessment after 30-day action plan execution to measure improvement

**Properties List**:
- `assessmentId`
- `baselineAssessment`
- `actionPlan`
- `organization`
- `assessmentDate`
- `daysSinceBaseline`
- `overallScore`
- `tier`
- `dimensionalScores`
- `methodology`
- *(and 1 more)*

---

#### **ProgressReport**

**Description**: Comprehensive report analyzing progress and improvements

**Term Code**: `entity-ProgressReport`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 20

**Business Meaning**: Business concept representing ProgressReport within the Progress Measurement domain

**Technical Meaning**: JSON-LD entity of type ProgressReport with 20 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of ProgressReport to manage comprehensive report analyzing progress and improvements

**Properties List**:
- `reportId`
- `baselineAssessment`
- `followUpAssessment`
- `actionPlan`
- `reportDate`
- `reportPeriod`
- `overallDelta`
- `dimensionalDeltas`
- `tierMovement`
- `actionCompletionRate`
- *(and 10 more)*

---

#### **TrendAnalysis**

**Description**: Analysis of score trends over time

**Term Code**: `entity-TrendAnalysis`
**Schema.org Equivalent**: `schema:Thing`
**Properties**: 10

**Business Meaning**: Business concept representing TrendAnalysis within the Progress Measurement domain

**Technical Meaning**: JSON-LD entity of type TrendAnalysis with 10 defined properties

**AI Agent Usage**: AI agents can query, create, update instances of TrendAnalysis to manage analysis of score trends over time

**Properties List**:
- `analysisId`
- `organization`
- `assessmentHistory`
- `trendDirection`
- `averageMonthlyGrowth`
- `velocity`
- `consistencyScore`
- `strongestDimension`
- `weakestDimension`
- `inflectionPoints`

---

## 🔧 PROPERTIES

*420 properties across all entities*

Properties are attributes that define the characteristics of entities.
For complete property specifications including data types, constraints, and examples,
please refer to the JSON glossary file.

### Properties by Entity

**AIMaturityContext**: 10 properties (7 required)
**AIVisibilityAssessment**: 13 properties (10 required)
**ActionExecution**: 21 properties (8 required)
**ActionPlan**: 20 properties (18 required)
**ActionWeek**: 7 properties (7 required)
**Blocker**: 11 properties (7 required)
**CompetitiveGap**: 6 properties (6 required)
**CompetitivePosition**: 5 properties (5 required)
**CompetitorComparison**: 5 properties (3 required)
**CompletionEvidence**: 6 properties (4 required)
**ContactPoint**: 6 properties (4 required)
**ConversionOffer**: 13 properties (10 required)
**CustomerOrganization**: 19 properties (13 required)
**Deliverable**: 8 properties (7 required)
**DeltaMeasurement**: 12 properties (8 required)
**DemoResults**: 20 properties (17 required)
**DiagnosticFinding**: 6 properties (6 required)
**DimensionalAssessment**: 8 properties (8 required)
**DimensionalIndicator**: 7 properties (5 required)
**DimensionalProjection**: 8 properties (7 required)
**FollowUpAssessment**: 11 properties (11 required)
**Forecast**: 19 properties (16 required)
**Gap**: 10 properties (10 required)
**GapAnalysis**: 13 properties (11 required)
**ImprovementOpportunity**: 13 properties (10 required)
**MilestoneProjection**: 7 properties (6 required)
**PrescribedAction**: 17 properties (13 required)
**ProgressReport**: 20 properties (15 required)
**RootCause**: 6 properties (6 required)
**ScenarioAnalysis**: 8 properties (6 required)
**StrategicProfile**: 8 properties (6 required)
**Subscription**: 8 properties (7 required)
**SubscriptionPackage**: 13 properties (10 required)
**SuccessStory**: 15 properties (14 required)
**TrajectoryModel**: 10 properties (7 required)
**TrendAnalysis**: 10 properties (9 required)
**VarianceReport**: 21 properties (20 required)

---

## 🔗 RELATIONSHIPS

*35 relationships connecting entities*


### 30-Day Action Plan

#### **addresses**

**Description**: Plan addresses findings from gap analysis

**Term Code**: `relationship-addresses`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  addresses 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **basedOn**

**Description**: Plan is based on baseline assessment

**Term Code**: `relationship-basedOn`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  basedOn 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **contains**

**Description**: Plan contains 5-15 prescribed actions

**Term Code**: `relationship-contains`
**Connection**: `` → ``
**Cardinality**: `5..15`

**Business Meaning**: Relationship expressing that  contains 

**Technical Meaning**: Link from  to  with cardinality 5..15

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **dependsOn**

**Description**: Action may depend on other actions completing first

**Term Code**: `relationship-dependsOn`
**Connection**: `` → ``
**Cardinality**: `0..*`

**Business Meaning**: Relationship expressing that  dependsOn 

**Technical Meaning**: Link from  to  with cardinality 0..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **organizedInto**

**Description**: Plan organized into 4 weeks

**Term Code**: `relationship-organizedInto`
**Connection**: `` → ``
**Cardinality**: `4..4`

**Business Meaning**: Relationship expressing that  organizedInto 

**Technical Meaning**: Link from  to  with cardinality 4..4

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **produces**

**Description**: Action produces one or more deliverables

**Term Code**: `relationship-produces`
**Connection**: `` → ``
**Cardinality**: `1..*`

**Business Meaning**: Relationship expressing that  produces 

**Technical Meaning**: Link from  to  with cardinality 1..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **scheduledIn**

**Description**: Action scheduled in specific week

**Term Code**: `relationship-scheduledIn`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  scheduledIn 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---


### AI Visibility Assessment

#### **assesses**

**Description**: Links assessment to the organization being evaluated

**Term Code**: `relationship-assesses`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  assesses 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **comparesTo**

**Description**: Position includes comparisons to competitors

**Term Code**: `relationship-comparesTo`
**Connection**: `` → ``
**Cardinality**: `0..*`

**Business Meaning**: Relationship expressing that  comparesTo 

**Technical Meaning**: Link from  to  with cardinality 0..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **hasDimensionalScore**

**Description**: Assessment includes exactly 5 dimensional scores

**Term Code**: `relationship-hasDimensionalScore`
**Connection**: `` → ``
**Cardinality**: `1..5`

**Business Meaning**: Relationship expressing that  hasDimensionalScore 

**Technical Meaning**: Link from  to  with cardinality 1..5

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **hasIndicator**

**Description**: Dimension is measured by multiple indicators

**Term Code**: `relationship-hasIndicator`
**Connection**: `` → ``
**Cardinality**: `1..*`

**Business Meaning**: Relationship expressing that  hasIndicator 

**Technical Meaning**: Link from  to  with cardinality 1..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---


### Conversion & Subscription

#### **basedOn**

**Description**: Offer is based on demo results

**Term Code**: `relationship-basedOn`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  basedOn 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **convertedTo**

**Description**: Demo may convert to subscription

**Term Code**: `relationship-convertedTo`
**Connection**: `` → ``
**Cardinality**: `0..1`

**Business Meaning**: Relationship expressing that  convertedTo 

**Technical Meaning**: Link from  to  with cardinality 0..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **documents**

**Description**: Success story documents demo results

**Term Code**: `relationship-documents`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  documents 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **offers**

**Description**: Offer includes one or more package options

**Term Code**: `relationship-offers`
**Connection**: `` → ``
**Cardinality**: `1..*`

**Business Meaning**: Relationship expressing that  offers 

**Technical Meaning**: Link from  to  with cardinality 1..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---


### Customer Organization Profile

#### **hasAIContext**

**Description**: Organization has AI maturity context

**Term Code**: `relationship-hasAIContext`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  hasAIContext 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **hasBeenAssessed**

**Description**: Organization has history of assessments

**Term Code**: `relationship-hasBeenAssessed`
**Connection**: `` → ``
**Cardinality**: `0..*`

**Business Meaning**: Relationship expressing that  hasBeenAssessed 

**Technical Meaning**: Link from  to  with cardinality 0..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **hasContact**

**Description**: Organization has one or more contacts

**Term Code**: `relationship-hasContact`
**Connection**: `` → ``
**Cardinality**: `1..*`

**Business Meaning**: Relationship expressing that  hasContact 

**Technical Meaning**: Link from  to  with cardinality 1..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **hasStrategicProfile**

**Description**: Organization has strategic profile

**Term Code**: `relationship-hasStrategicProfile`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  hasStrategicProfile 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---


### Forecasting & Trajectory

#### **basedOnModel**

**Description**: Forecast may be based on trajectory model

**Term Code**: `relationship-basedOnModel`
**Connection**: `` → ``
**Cardinality**: `0..1`

**Business Meaning**: Relationship expressing that  basedOnModel 

**Technical Meaning**: Link from  to  with cardinality 0..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **includesScenario**

**Description**: Forecast may include multiple scenarios

**Term Code**: `relationship-includesScenario`
**Connection**: `` → ``
**Cardinality**: `0..*`

**Business Meaning**: Relationship expressing that  includesScenario 

**Technical Meaning**: Link from  to  with cardinality 0..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **projectsFrom**

**Description**: Forecast projects from baseline assessment

**Term Code**: `relationship-projectsFrom`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  projectsFrom 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **projectsMilestone**

**Description**: Forecast includes milestone projections

**Term Code**: `relationship-projectsMilestone`
**Connection**: `` → ``
**Cardinality**: `0..*`

**Business Meaning**: Relationship expressing that  projectsMilestone 

**Technical Meaning**: Link from  to  with cardinality 0..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---


### Gap Analysis & Diagnosis

#### **addresses**

**Description**: Opportunity addresses one or more gaps

**Term Code**: `relationship-addresses`
**Connection**: `` → ``
**Cardinality**: `1..*`

**Business Meaning**: Relationship expressing that  addresses 

**Technical Meaning**: Link from  to  with cardinality 1..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **basedOn**

**Description**: Gap analysis is based on an assessment

**Term Code**: `relationship-basedOn`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  basedOn 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **causedBy**

**Description**: Gap has one or more root causes

**Term Code**: `relationship-causedBy`
**Connection**: `` → ``
**Cardinality**: `1..*`

**Business Meaning**: Relationship expressing that  causedBy 

**Technical Meaning**: Link from  to  with cardinality 1..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **identifiesGap**

**Description**: Analysis identifies multiple gaps

**Term Code**: `relationship-identifiesGap`
**Connection**: `` → ``
**Cardinality**: `1..*`

**Business Meaning**: Relationship expressing that  identifiesGap 

**Technical Meaning**: Link from  to  with cardinality 1..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---


### Implementation Tracking

#### **analyzesExecution**

**Description**: Variance report analyzes plan execution

**Term Code**: `relationship-analyzesExecution`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  analyzesExecution 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **blockedBy**

**Description**: Action may be blocked by issues

**Term Code**: `relationship-blockedBy`
**Connection**: `` → ``
**Cardinality**: `0..*`

**Business Meaning**: Relationship expressing that  blockedBy 

**Technical Meaning**: Link from  to  with cardinality 0..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **executesAction**

**Description**: Execution record tracks a prescribed action

**Term Code**: `relationship-executesAction`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  executesAction 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **providesEvidence**

**Description**: Execution has evidence of completion

**Term Code**: `relationship-providesEvidence`
**Connection**: `` → ``
**Cardinality**: `0..*`

**Business Meaning**: Relationship expressing that  providesEvidence 

**Technical Meaning**: Link from  to  with cardinality 0..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---


### Progress Measurement

#### **analyzesTrend**

**Description**: Trend analysis is for specific organization

**Term Code**: `relationship-analyzesTrend`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  analyzesTrend 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **evaluates**

**Description**: Follow-up evaluates plan execution results

**Term Code**: `relationship-evaluates`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  evaluates 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **follows**

**Description**: Follow-up assessment follows baseline

**Term Code**: `relationship-follows`
**Connection**: `` → ``
**Cardinality**: `1..1`

**Business Meaning**: Relationship expressing that  follows 

**Technical Meaning**: Link from  to  with cardinality 1..1

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

#### **measures**

**Description**: Report contains delta measurements (1 overall + 5 dimensional)

**Term Code**: `relationship-measures`
**Connection**: `` → ``
**Cardinality**: `6..*`

**Business Meaning**: Relationship expressing that  measures 

**Technical Meaning**: Link from  to  with cardinality 6..*

**AI Agent Usage**: AI agents use this to traverse from  entities to related  entities

---

## 📚 APPENDIX

### Usage Guidelines

This glossary serves as the definitive reference for all terminology used in the
AI Visibility Scorecard Framework. When implementing systems or discussing concepts:
- Use the exact term names as specified
- Follow the data types and constraints for properties
- Respect relationship cardinalities
- Reference the schema.org equivalents for interoperability

### AI Agent Integration

AI agents can use this glossary to:
- Understand the semantic meaning of entities and relationships
- Validate data structures against defined constraints
- Generate queries for retrieving specific information
- Reason about the business domain
- Provide natural language explanations of data

### Versioning

This is version 1.0.0 of the glossary, aligned with version 1.0.0 of all 8 ontologies.
Future versions will maintain backward compatibility where possible.

---

*Generated: 2025-10-13T19:36:05.289267*
*AI Visibility Scorecard Framework | BAIV Ltd*