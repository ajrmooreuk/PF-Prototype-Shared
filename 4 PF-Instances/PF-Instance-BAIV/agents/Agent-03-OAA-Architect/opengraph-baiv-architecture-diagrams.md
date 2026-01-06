# OpenGraph + BAIV Integration Architecture Diagrams

## 1. OG Discovery Pipeline Flow

```mermaid
flowchart TB
    subgraph Sources["Discovery Sources"]
        S1[Personal Websites]
        S2[LinkedIn Profiles]
        S3[Twitter/X Profiles]
        S4[Company Websites]
        S5[Content Platforms]
        S6[Conference Pages]
    end

    subgraph Parser["OG Parser Module"]
        P1[URL Fetcher]
        P2[Meta Tag Extractor]
        P3[Property Normalizer]
        P4[Type Classifier]
    end

    subgraph Resolver["Entity Resolution"]
        R1[Name Matching]
        R2[URL Canonicalization]
        R3[Cross-Platform Linking]
        R4[Confidence Scoring]
    end

    subgraph Ontology["BAIV Ontology"]
        O1[(Person Entities)]
        O2[(Organization Entities)]
        O3[(Content Entities)]
        O4[(Relationship Graph)]
    end

    Sources --> P1
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> Resolver
    R1 --> R4
    R2 --> R4
    R3 --> R4
    R4 -->|Person| O1
    R4 -->|Organization| O2
    R4 -->|Content| O3
    O1 --> O4
    O2 --> O4
    O3 --> O4
```

## 2. OG Property Mapping to Schema.org

```mermaid
flowchart LR
    subgraph OG["OpenGraph Properties"]
        OG1["og:title"]
        OG2["og:description"]
        OG3["og:url"]
        OG4["og:image"]
        OG5["og:type"]
        OG6["og:site_name"]
        OG7["profile:first_name"]
        OG8["profile:last_name"]
        OG9["article:author"]
    end

    subgraph Schema["Schema.org Properties"]
        S1["name"]
        S2["description"]
        S3["url"]
        S4["image"]
        S5["@type"]
        S6["Organization.name"]
        S7["Person.givenName"]
        S8["Person.familyName"]
        S9["author"]
    end

    OG1 --> S1
    OG2 --> S2
    OG3 --> S3
    OG4 --> S4
    OG5 --> S5
    OG6 --> S6
    OG7 --> S7
    OG8 --> S8
    OG9 --> S9
```

## 3. OG Type Hierarchy for BAIV

```mermaid
graph TD
    Root["og:type"] --> Website["website"]
    Root --> Profile["profile"]
    Root --> Article["article"]
    Root --> Business["business.business"]
    Root --> Product["product"]
    
    Profile --> Person["→ Schema: Person"]
    Business --> Org["→ Schema: Organization"]
    Article --> Content["→ Schema: Article/BlogPosting"]
    Product --> Service["→ Schema: Product/Service"]
    Website --> WebPage["→ Schema: WebPage"]
    
    Person --> BAIV_Person["BAIV: PersonEntity"]
    Org --> BAIV_Org["BAIV: OrganizationEntity"]
    Content --> BAIV_Content["BAIV: ContentEntity"]
    Service --> BAIV_Service["BAIV: ServiceEntity"]
    WebPage --> BAIV_Web["BAIV: WebPresence"]
```

## 4. Agent Integration with OG Discovery

```mermaid
flowchart TB
    subgraph Discovery["OG Discovery Layer"]
        OG[OpenGraph Parser]
        Schema[Schema.org Parser]
        Merge[Data Merger]
    end

    subgraph Agents["BAIV Agent Orchestra"]
        P0[P0: Master Orchestrator]
        P2[P2: Deep Research]
        P3[P3: Technical Audit]
        P5[P5: Network Analysis]
        P10[P10: Content Optimizer]
        P13[P13: Performance Monitor]
        P14[P14: Predictive Analytics]
    end

    subgraph Actions["Agent Actions"]
        A1[Extract OG from URLs]
        A2[Validate OG Quality]
        A3[Map Relationships]
        A4[Recommend OG Fixes]
        A5[Track OG Metrics]
        A6[Predict Impact]
    end

    OG --> Merge
    Schema --> Merge
    Merge --> P0

    P0 --> P2
    P0 --> P3
    P0 --> P5
    P0 --> P10
    P0 --> P13
    P0 --> P14

    P2 --> A1
    P3 --> A2
    P5 --> A3
    P10 --> A4
    P13 --> A5
    P14 --> A6
```

## 5. Cross-Platform Entity Resolution

```mermaid
flowchart LR
    subgraph LinkedIn["LinkedIn"]
        L1["og:title: Jane Doe - CEO"]
        L2["og:url: linkedin.com/in/janedoe"]
        L3["og:image: headshot.jpg"]
    end

    subgraph Twitter["Twitter/X"]
        T1["twitter:title: Jane Doe"]
        T2["twitter:site: @janedoe"]
        T3["twitter:image: avatar.jpg"]
    end

    subgraph Website["Personal Website"]
        W1["og:title: Jane Doe"]
        W2["og:url: janedoe.com"]
        W3["profile:first_name: Jane"]
        W4["profile:last_name: Doe"]
    end

    subgraph Resolution["Entity Resolution"]
        R1[Name Match: Jane Doe]
        R2[Username Link: janedoe]
        R3[Image Similarity]
        R4[URL Cross-Reference]
    end

    subgraph Result["Unified Entity"]
        E1["Person: Jane Doe"]
        E2["Identifiers: linkedin, twitter, website"]
        E3["Confidence: 95%"]
    end

    LinkedIn --> R1
    Twitter --> R1
    Website --> R1
    
    L2 --> R2
    T2 --> R2
    W2 --> R2
    
    L3 --> R3
    T3 --> R3
    
    R1 --> R4
    R2 --> R4
    R3 --> R4
    
    R4 --> E1
    R4 --> E2
    R4 --> E3
```

## 6. OG Quality Scoring Framework

```mermaid
flowchart TB
    subgraph Input["OG Metadata Input"]
        I1[Extracted OG Tags]
        I2[Expected Tags by Type]
    end

    subgraph Scoring["Quality Dimensions"]
        S1[Completeness Score]
        S2[Accuracy Score]
        S3[Freshness Score]
        S4[Image Quality Score]
        S5[Consistency Score]
    end

    subgraph Weights["Visibility Weights"]
        W1["Completeness: 30%"]
        W2["Accuracy: 25%"]
        W3["Freshness: 15%"]
        W4["Image: 15%"]
        W5["Consistency: 15%"]
    end

    subgraph Output["OG Visibility Score"]
        O1[Composite Score 0-100]
        O2[Gap Analysis]
        O3[Recommendations]
    end

    I1 --> S1
    I2 --> S1
    I1 --> S2
    I1 --> S3
    I1 --> S4
    I1 --> S5

    S1 --> W1
    S2 --> W2
    S3 --> W3
    S4 --> W4
    S5 --> W5

    W1 --> O1
    W2 --> O1
    W3 --> O1
    W4 --> O1
    W5 --> O1

    O1 --> O2
    O2 --> O3
```

## 7. Implementation Phase Timeline

```mermaid
gantt
    title OG Integration Implementation Phases
    dateFormat  YYYY-MM-DD
    section Phase 1
    OG Parser Module           :p1a, 2025-01-06, 7d
    OG-Ontology Mapping        :p1b, 2025-01-06, 7d
    URL Seed Taxonomy          :p1c, after p1a, 7d
    section Phase 2
    Entity Matching Algorithms :p2a, after p1c, 7d
    Cross-Platform Resolution  :p2b, after p2a, 7d
    Confidence Scoring         :p2c, after p2a, 7d
    section Phase 3
    Visibility Score Integration :p3a, after p2b, 7d
    Agent Integration (P13)      :p3b, after p3a, 7d
    section Phase 4
    Continuous Monitoring       :p4a, after p3b, 7d
    Discovery Expansion         :p4b, after p4a, 7d
```

## 8. OAA Ontology Extension Structure

```mermaid
classDiagram
    class BAIVEntity {
        +String id
        +String displayName
        +String description
        +URL canonicalUrl
        +Image primaryImage
        +EntityType entityType
    }

    class OGMetadata {
        +String ogTitle
        +String ogType
        +String ogDescription
        +URL ogUrl
        +URL ogImage
        +String ogSiteName
        +String ogLocale
        +DateTime lastCrawled
        +Float completenessScore
    }

    class PersonEntity {
        +String givenName
        +String familyName
        +String username
        +List~URL~ socialProfiles
        +List~String~ expertise
    }

    class OrganizationEntity {
        +String legalName
        +String industry
        +Address headquarters
        +List~PersonEntity~ keyPeople
    }

    class ProfileOGData {
        +String firstName
        +String lastName
        +String username
        +String gender
    }

    class BusinessOGData {
        +String streetAddress
        +String locality
        +String region
        +String postalCode
        +String countryName
    }

    BAIVEntity <|-- PersonEntity
    BAIVEntity <|-- OrganizationEntity
    BAIVEntity *-- OGMetadata
    OGMetadata <|-- ProfileOGData
    OGMetadata <|-- BusinessOGData
    PersonEntity *-- ProfileOGData
    OrganizationEntity *-- BusinessOGData
```

---

*These diagrams provide visual architecture documentation for the OpenGraph integration into BAIV. Render using any Mermaid-compatible viewer or the BAIV dashboard.*
