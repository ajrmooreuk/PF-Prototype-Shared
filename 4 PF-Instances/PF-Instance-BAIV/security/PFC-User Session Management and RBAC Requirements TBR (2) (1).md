\#Platform Architecture Specification

PFI\[BAIV\]  
BAIV Subscripion\]

\#\#Scope

Access as a prospect during Lead Targeting and campaigns, goal to achieve Sign-Up

Sign-up and payment

Get inputs and payment

CRM Checks, User Checks. Org Checks discovery.

New user, existing signup  
Edit /Change User Access,   
Add User  
Assign Access Rights/modify

\#\# Session Manager & Ontology Architecture for AI-Led Agentic Business Platform

\-----

\#\#\# Document Control

|Field             |Value                                                 |  
|------------------|------------------------------------------------------|  
|\*\*Document Title\*\*|BAIV Platform Architecture Specification              |  
|\*\*Document ID\*\*   |BAIV-ARCH-001                                         |  
|\*\*Version\*\*       |1.0                                                   |  
|\*\*Date\*\*          |September 14, 2025                                    |  
|\*\*Author\*\*        |AI BI and Digital Transformation Consultant Architect |  
|\*\*Classification\*\*|Internal Technical Specification                      |  
|\*\*Distribution\*\*  |BAIV Development Team, Wings4Mind.ai Architecture Team|

\#\#\# Version History

|Version|Date         |Author          |Changes                                      |  
|-------|-------------|----------------|---------------------------------------------|  
|0.1    |Sept 14, 2025|System Architect|Initial draft with core diagrams             |  
|1.0    |Sept 14, 2025|System Architect|Added SSO integration, finalized architecture|

\#\#\# Review and Approval

|Role                   |Name     |Signature|Date     |  
|-----------------------|---------|---------|---------|  
|\*\*Technical Architect\*\*|\[Pending\]|\[Pending\]|\[Pending\]|  
|\*\*Security Architect\*\* |\[Pending\]|\[Pending\]|\[Pending\]|  
|\*\*Product Owner\*\*      |\[Pending\]|\[Pending\]|\[Pending\]|

\-----

\#\# Table of Contents

1\. \[Executive Summary\](\#1-executive-summary)  
1\. \[Document Purpose and Scope\](\#2-document-purpose-and-scope)  
1\. \[Architecture Overview\](\#3-architecture-overview)  
\- 3.1 \[System Context\](\#31-system-context)  
\- 3.2 \[Key Architectural Principles\](\#32-key-architectural-principles)  
\- 3.3 \[Technology Stack\](\#33-technology-stack)  
1\. \[Actor Model and Role-Based Access\](\#4-actor-model-and-role-based-access)  
\- 4.1 \[System Context Diagram\](\#41-system-context-diagram)  
\- 4.2 \[Actor Role Hierarchy\](\#42-actor-role-hierarchy)  
\- 4.3 \[Row Level Security Matrix\](\#43-row-level-security-matrix)  
1\. \[Session Management Architecture\](\#5-session-management-architecture)  
\- 5.1 \[Session State Machine\](\#51-session-state-machine)  
\- 5.2 \[Agent Processing Flow\](\#52-agent-processing-flow)  
1\. \[Data Architecture and Ontology\](\#6-data-architecture-and-ontology)  
\- 6.1 \[Core Entity Relationships\](\#61-core-entity-relationships)  
\- 6.2 \[Schema.org Compliance\](\#62-schemaorg-compliance)  
1\. \[Authentication and Security\](\#7-authentication-and-security)  
\- 7.1 \[SSO Authentication Architecture\](\#71-sso-authentication-architecture)  
\- 7.2 \[SSO Authentication Flow\](\#72-sso-authentication-flow)  
1\. \[Business Model Integration\](\#8-business-model-integration)  
\- 8.1 \[Payment and Commission Architecture\](\#81-payment-and-commission-architecture)  
1\. \[Deployment and Infrastructure\](\#9-deployment-and-infrastructure)  
\- 9.1 \[Cloud Deployment Architecture\](\#91-cloud-deployment-architecture)  
1\. \[Implementation Guidelines\](\#10-implementation-guidelines)  
\- 10.1 \[State Persistence Strategy\](\#101-state-persistence-strategy)  
\- 10.2 \[Security Implementation\](\#102-security-implementation)  
\- 10.3 \[Scalability Features\](\#103-scalability-features)  
1\. \[MVP1 Scope and Future Roadmap\](\#11-mvp1-scope-and-future-roadmap)  
1\. \[Appendices\](\#12-appendices)  
\- 12.1 \[Glossary of Terms\](\#121-glossary-of-terms)  
\- 12.2 \[Technical References\](\#122-technical-references)

\-----

\#\# 1\. Executive Summary

The BAIV (Be AI Visible) platform represents a comprehensive AI-led agentic business solution built on the Wings4Mind.ai engine. This document specifies the technical architecture for a multi-tenant, role-based platform supporting consultants, agencies, affiliates, and direct clients in AI automation and digital transformation initiatives.

\#\#\# Key Business Requirements Addressed:

\- \*\*Multi-tenant architecture\*\* supporting BAIV organization and PF tenants  
\- \*\*Role-based access control\*\* with affiliate commission tracking  
\- \*\*White label and co-branding\*\* capabilities for agents and partners  
\- \*\*Enterprise SSO integration\*\* for seamless authentication  
\- \*\*AI agent orchestration\*\* (P1-P16 agents, MVP1 covers P1-P6/7)  
\- \*\*Session management\*\* with state persistence and scenario handling  
\- \*\*Comprehensive audit trails\*\* and impact analysis

\#\#\# Technical Architecture Highlights:

\- \*\*Cloud-native deployment\*\* with Supabase backend and Stripe payments  
\- \*\*Row Level Security (RLS)\*\* ensuring data isolation between tenants and roles  
\- \*\*JSONB-based ontology\*\* following Schema.org standards  
\- \*\*Scalable agent processing\*\* with async queue-based execution  
\- \*\*Enterprise authentication\*\* via SAML, OIDC, and OAuth protocols

\-----

\#\# 2\. Document Purpose and Scope

\#\#\# 2.1 Purpose

This document provides comprehensive technical specifications for the BAIV platform architecture, focusing on:

\- Session management and state persistence  
\- Multi-tenant security and access control  
\- AI agent orchestration and processing flows  
\- Enterprise authentication and SSO integration  
\- Business model implementation (affiliates, commissions, white labeling)

\#\#\# 2.2 Scope

\*\*In Scope:\*\*

\- MVP1 implementation covering agents P1-P6/7  
\- Multi-role user management and authentication  
\- Session lifecycle and scenario management  
\- Data architecture and ontology design  
\- Payment processing and commission tracking  
\- Cloud deployment and infrastructure planning

\*\*Out of Scope:\*\*

\- Detailed UI/UX specifications  
\- Specific AI model implementations  
\- Third-party integration details beyond authentication  
\- Performance testing specifications  
\- Detailed operational procedures

\#\#\# 2.3 Audience

\- \*\*Technical Architects\*\* implementing the BAIV platform  
\- \*\*Development Teams\*\* building session management and authentication systems  
\- \*\*Security Engineers\*\* implementing RLS and SSO integration  
\- \*\*Product Managers\*\* understanding technical constraints and capabilities  
\- \*\*DevOps Engineers\*\* planning deployment and infrastructure

\-----

\#\# 3\. Architecture Overview

\#\#\# 3.1 System Context

BAIV operates as a comprehensive AI consultation platform serving multiple stakeholder types through a unified, secure, multi-tenant architecture. The system facilitates AI-driven business transformation through structured consultation sessions, agent-based processing, and outcome generation.

\#\#\# 3.2 Key Architectural Principles

1\. \*\*Multi-tenancy\*\*: Secure isolation between different organizational contexts  
1\. \*\*Role-based Security\*\*: Granular access control based on user roles and affiliations  
1\. \*\*State Persistence\*\*: Reliable session management with resumable scenarios  
1\. \*\*Audit Transparency\*\*: Comprehensive logging of all user actions and agent processing  
1\. \*\*Scalable Processing\*\*: Async, queue-based agent execution for performance  
1\. \*\*Enterprise Integration\*\*: Standards-based SSO for seamless authentication  
1\. \*\*Business Model Flexibility\*\*: Support for affiliates, white labeling, and commission structures

\#\#\# 3.3 Technology Stack

\- \*\*Backend\*\*: Supabase (PostgreSQL) with JSONB storage  
\- \*\*Authentication\*\*: Custom SSO broker with SAML/OIDC/OAuth support  
\- \*\*Payments\*\*: Stripe integration for subscriptions and commission processing  
\- \*\*AI Engine\*\*: Wings4Mind.ai for agent orchestration  
\- \*\*Caching\*\*: Redis for session state and performance optimization  
\- \*\*Deployment\*\*: Cloud-native architecture with horizontal scaling  
\- \*\*Standards Compliance\*\*: Schema.org for ontology structure

\-----

\#\# 4\. Actor Model and Role-Based Access

\#\#\# 4.1 System Context Diagram

\*\*Purpose:\*\* Shows the overall system boundaries, external actors, and high-level interactions for the BAIV platform.

\`\`\`mermaid  
graph TB  
    subgraph "External Actors"  
        DU\[Direct Users\]  
        CA\[Consultant Activists\]  
        CT\[Consultant Tenants\]  
        AG\[Agencies\]  
        AF\[Affiliates\]  
        CL\[Clients\]  
    end  
      
    subgraph "BAIV Platform"  
        BAIV\[BAIV Core System\]  
        W4M\[Wings4Mind.ai Engine\]  
    end  
      
    subgraph "External Services"  
        STRIPE\[Stripe Payments\]  
        SUPA\[Supabase Database\]  
        SCHEMA\[Schema.org Ontology\]  
    end  
      
    DU \--\>|Login/Interact| BAIV  
    CA \--\>|Consult/Manage| BAIV  
    CT \--\>|Tenant Operations| BAIV  
    AG \--\>|Multi-user Management| BAIV  
    AF \--\>|Commission Tracking| BAIV  
    CL \--\>|Client Sessions| BAIV  
      
    BAIV \<--\>|AI Processing| W4M  
    BAIV \<--\>|Payments| STRIPE  
    BAIV \<--\>|Data Storage| SUPA  
    BAIV \--\>|Schema Compliance| SCHEMA  
\`\`\`

\#\#\# 4.2 Actor Role Hierarchy

\*\*Purpose:\*\* Defines the role-based access control and relationship hierarchy between different user types.

\`\`\`mermaid  
graph TD  
    subgraph "Platform Roles"  
        PLAT\[Platform Owner\]  
        BAIV\_ORG\[BAIV Organization\]  
    end  
      
    subgraph "Business Roles"  
        TENANT\[PF Tenant\]  
        AGENCY\[Agency Account\]  
        AFFILIATE\[Affiliate Partner\]  
    end  
      
    subgraph "User Roles"  
        CONS\_ACT\[Consultant Activist\]  
        CONS\_TEN\[Consultant for Tenant\]  
        AGENT\[White Label Agent\]  
        CLIENT\[Direct Client\]  
        USER\[End User\]  
    end  
      
    PLAT \--\>|Manages| BAIV\_ORG  
    BAIV\_ORG \--\>|Licenses to| TENANT  
    BAIV\_ORG \--\>|Partners with| AFFILIATE  
    TENANT \--\>|Employs| CONS\_TEN  
    AGENCY \--\>|Manages 1-5| USER  
    AFFILIATE \--\>|Can be| AGENT  
    AFFILIATE \--\>|Can be| CLIENT  
    AGENT \--\>|Manages| CLIENT  
    CONS\_ACT \--\>|Serves| BAIV\_ORG  
      
    style PLAT fill:\#ff9999  
    style AFFILIATE fill:\#99ff99  
    style AGENT fill:\#9999ff  
    style CLIENT fill:\#ffff99  
\`\`\`

\#\#\# 4.3 Row Level Security Matrix

\*\*Purpose:\*\* Defines data access permissions based on user roles and relationships.

\`\`\`mermaid  
graph TB  
    subgraph "RLS Access Control"  
        subgraph "Client Access"  
            C\_OWN\[Own Account Only\]  
            C\_SESS\[Own Sessions Only\]  
            C\_CONS\[Own Consultations Only\]  
        end  
          
        subgraph "Affiliate Access"  
            A\_COMM\[Commission Data\]  
            A\_ATTR\[Attribution Records\]  
            A\_NO\_CLIENT\[No Client Data Access\]  
        end  
          
        subgraph "Agent Access"  
            AG\_MANAGED\[Managed Client Accounts\]  
            AG\_SESS\[Client Sessions\]  
            AG\_MOD\[Modify Authorized Data\]  
            AG\_BRAND\[White Label Branding\]  
        end  
          
        subgraph "Consultant Access"  
            CONS\_TENANT\[Tenant Client Data\]  
            CONS\_BAIV\[BAIV Client Data\]  
            CONS\_SESS\[All Authorized Sessions\]  
        end  
          
        subgraph "Agency Access"  
            AGENCY\_MULTI\[5 User Accounts Max\]  
            AGENCY\_TAG\[Tagged Management\]  
            AGENCY\_SOLUTIONS\[Own/BAIV Solutions\]  
        end  
    end  
      
    CLIENT \--\>|Can Access| C\_OWN  
    CLIENT \--\>|Can Access| C\_SESS  
    CLIENT \--\>|Can Access| C\_CONS  
      
    AFFILIATE \--\>|Can Access| A\_COMM  
    AFFILIATE \--\>|Can Access| A\_ATTR  
    AFFILIATE \-.-\>|Cannot Access| A\_NO\_CLIENT  
      
    AGENT \--\>|Can Access| AG\_MANAGED  
    AGENT \--\>|Can Access| AG\_SESS  
    AGENT \--\>|Can Modify| AG\_MOD  
    AGENT \--\>|Can Brand| AG\_BRAND  
      
    CONSULTANT \--\>|Can Access| CONS\_TENANT  
    CONSULTANT \--\>|Can Access| CONS\_BAIV  
    CONSULTANT \--\>|Can Manage| CONS\_SESS  
      
    AGENCY \--\>|Can Manage| AGENCY\_MULTI  
    AGENCY \--\>|Schema Tagged| AGENCY\_TAG  
    AGENCY \--\>|Deploy| AGENCY\_SOLUTIONS  
\`\`\`

\-----

\#\# 5\. Session Management Architecture

\#\#\# 5.1 Session State Machine

\*\*Purpose:\*\* Shows the lifecycle of consultation sessions and state transitions for the BAIV system.

\`\`\`mermaid  
stateDiagram-v2  
    \[\*\] \--\> AccountCreated  
    AccountCreated \--\> ProfileSetup  
    ProfileSetup \--\> BundleSelection  
    BundleSelection \--\> SessionInitiated  
      
    SessionInitiated \--\> ScenarioLoading  
    ScenarioLoading \--\> ScenarioInProgress  
    ScenarioInProgress \--\> ScenarioIncomplete  
    ScenarioInProgress \--\> ScenarioCompleted  
      
    ScenarioIncomplete \--\> ScenarioLoading : Reload  
    ScenarioCompleted \--\> ScenarioLocked  
    ScenarioLocked \--\> ScenarioDuplicated : Duplicate Only  
      
    ScenarioCompleted \--\> AgentExecution  
    AgentExecution \--\> P1\_P6\_Processing : MVP1 Scope  
    AgentExecution \--\> P7\_P16\_Processing : Future Scope  
      
    P1\_P6\_Processing \--\> AuditTrail  
    P7\_P16\_Processing \--\> AuditTrail  
    AuditTrail \--\> OutcomeGenerated  
    OutcomeGenerated \--\> SessionComplete  
      
    SessionComplete \--\> SessionArchived  
    SessionComplete \--\> SessionInitiated : New Session  
      
    SessionArchived \--\> \[\*\] : Account Terminated  
      
    note right of ScenarioLocked  
        Locked scenarios can be  
        duplicated but not edited  
    end note  
      
    note right of P1\_P6\_Processing  
        MVP1: Agents P1-P6/7  
        Future: P1-P16  
    end note  
\`\`\`

\#\#\# 5.2 Agent Processing Flow

\*\*Purpose:\*\* Shows the processing pipeline for AI agents and their interactions within sessions.

\`\`\`mermaid  
sequenceDiagram  
    participant U as User/Client  
    participant S as Session Manager  
    participant P1 as Agent P1  
    participant P2 as Agent P2  
    participant P3 as Agent P3  
    participant P6 as Agent P6  
    participant A as Audit System  
    participant DB as Supabase DB  
      
    U-\>\>S: Initiate Session  
    S-\>\>DB: Create Session Record  
    S-\>\>U: Session Started  
      
    U-\>\>S: Load/Select Scenario  
    S-\>\>DB: Persist Scenario State  
      
    S-\>\>P1: Execute Agent P1  
    P1-\>\>A: Log Processing Start  
    P1-\>\>P1: Process Input Data  
    P1-\>\>DB: Store P1 Outcomes  
    P1-\>\>A: Log P1 Completion  
      
    S-\>\>P2: Execute Agent P2 (with P1 context)  
    P2-\>\>A: Log Processing Start  
    P2-\>\>P2: Process with P1 Results  
    P2-\>\>DB: Store P2 Outcomes  
    P2-\>\>A: Log P2 Completion  
      
    S-\>\>P3: Execute Agent P3  
    P3-\>\>A: Log Processing Start  
    P3-\>\>P3: Process Multi-Agent Context  
    P3-\>\>DB: Store P3 Outcomes  
    P3-\>\>A: Log P3 Completion  
      
    Note over S,P6: ... Continue through P4, P5, P6 (MVP1)  
      
    S-\>\>P6: Execute Agent P6  
    P6-\>\>A: Log Processing Start  
    P6-\>\>P6: Final Processing  
    P6-\>\>DB: Store Final Outcomes  
    P6-\>\>A: Log P6 Completion  
      
    S-\>\>A: Generate Impact Analysis  
    A-\>\>DB: Store Audit Trail  
    S-\>\>U: Session Complete with Outcomes  
      
    alt Session Incomplete  
        U-\>\>S: Save Incomplete State  
        S-\>\>DB: Persist State for Reload  
    else Session Complete  
        S-\>\>DB: Lock Session (if complete)  
        S-\>\>U: Enable Duplication (locked scenarios)  
    end  
\`\`\`

\-----

\#\# 6\. Data Architecture and Ontology

\#\#\# 6.1 Core Entity Relationships

\*\*Purpose:\*\* Core entity relationships and data model based on Schema.org principles, stored in Supabase JSONB format.

\`\`\`mermaid  
erDiagram  
    ACCOUNT ||--o{ CONSULTATION : has  
    ACCOUNT ||--o{ PAYMENT : processes  
    ACCOUNT ||--|| ROLE : assigned  
    ACCOUNT }|--|| AFFILIATE : "may be"  
    ACCOUNT ||--|| TENANT : "belongs to"  
    ACCOUNT ||--o{ SSO\_IDENTITY : "linked to"  
      
    TENANT ||--o{ TENANT\_SSO\_CONFIG : configures  
    SSO\_IDENTITY }|--|| TENANT\_SSO\_CONFIG : "uses config"  
      
    CONSULTATION ||--o{ SESSION : contains  
    CONSULTATION ||--|| CONSULTANT : "managed by"  
      
    SESSION ||--o{ AGENT\_EXECUTION : triggers  
    SESSION ||--|| SCENARIO : uses  
    SESSION ||--o{ AUDIT\_LOG : generates  
      
    AGENT\_EXECUTION ||--|| AGENT\_TYPE : "P1-P16"  
    AGENT\_EXECUTION ||--o{ OUTCOME : produces  
    AGENT\_EXECUTION ||--o{ OUTPUT : generates  
      
    SCENARIO ||--o{ STATE\_PERSISTENCE : maintains  
      
    AFFILIATE ||--o{ COMMISSION : earns  
    AFFILIATE ||--|| ATTRIBUTION : tracked  
      
    ROLE {  
        string role\_type "direct\_user|consultant\_activist|consultant\_tenant|agency|affiliate|client"  
        boolean affiliate\_privileges  
        jsonb permissions  
        jsonb bundle\_features  
    }  
      
    ACCOUNT {  
        uuid id PK  
        string email  
        jsonb profile\_data  
        uuid role\_id FK  
        uuid affiliate\_id FK  
        uuid tenant\_id FK  
        string tenant\_brand  
        boolean white\_label  
        datetime created\_at  
        jsonb account\_settings  
    }  
      
    SSO\_IDENTITY {  
        uuid id PK  
        uuid account\_id FK  
        string provider\_type "saml|oidc|oauth|social"  
        string provider\_name "microsoft|google|okta|facebook|linkedin"  
        string external\_id  
        jsonb provider\_claims  
        datetime linked\_at  
        boolean is\_primary  
    }  
      
    TENANT\_SSO\_CONFIG {  
        uuid id PK  
        uuid tenant\_id FK  
        string provider\_type "saml|oidc|oauth"  
        string provider\_name  
        jsonb sso\_configuration  
        jsonb role\_mappings  
        boolean auto\_provision  
        boolean is\_active  
        datetime configured\_at  
    }  
      
    TENANT {  
        uuid id PK  
        string tenant\_name  
        string tenant\_type "baiv|pf\_tenant|white\_label"  
        jsonb branding\_config  
        jsonb feature\_flags  
        boolean sso\_enabled  
        datetime created\_at  
        string status "active|suspended|archived"  
    }  
      
    CONSULTATION {  
        uuid id PK  
        uuid account\_id FK  
        uuid consultant\_id FK  
        string consultation\_type  
        jsonb consultation\_data  
        string status  
        datetime created\_at  
        datetime updated\_at  
    }  
      
    SESSION {  
        uuid id PK  
        uuid consultation\_id FK  
        string session\_status "initiated|in\_progress|incomplete|completed|locked|archived"  
        jsonb session\_state  
        jsonb scenario\_data  
        datetime started\_at  
        datetime completed\_at  
    }  
      
    AGENT\_EXECUTION {  
        uuid id PK  
        uuid session\_id FK  
        string agent\_code "P1|P2|P3|P4|P5|P6|P7-P16"  
        jsonb input\_data  
        jsonb processing\_state  
        datetime executed\_at  
        string execution\_status  
    }  
      
    OUTCOME {  
        uuid id PK  
        uuid agent\_execution\_id FK  
        jsonb outcome\_data  
        string outcome\_type  
        datetime generated\_at  
    }  
      
    AUDIT\_LOG {  
        uuid id PK  
        uuid session\_id FK  
        string action\_type  
        jsonb before\_state  
        jsonb after\_state  
        uuid performed\_by FK  
        datetime logged\_at  
        jsonb impact\_analysis  
    }  
\`\`\`

\#\#\# 6.2 Schema.org Compliance

The BAIV ontology follows Schema.org standards where applicable:

\- \*\*Person\*\* entities for users and consultants  
\- \*\*Organization\*\* entities for tenants and agencies  
\- \*\*Action\*\* entities for consultation sessions  
\- \*\*Event\*\* entities for agent executions  
\- \*\*Product\*\* entities for service bundles  
\- \*\*Invoice\*\* entities for payments and commissions

\-----

\#\# 7\. Authentication and Security

\#\#\# 7.1 SSO Authentication Architecture

\*\*Purpose:\*\* Comprehensive Single Sign-On integration supporting enterprise identity providers and social logins.

\`\`\`mermaid  
graph TB  
    subgraph "Identity Providers"  
        ENTERPRISE\[Enterprise IdP\]  
        MSAD\[Microsoft AD/Azure\]  
        GOOGLE\[Google Workspace\]  
        OKTA\[Okta\]  
        SOCIAL\[Social Logins\]  
    end  
      
    subgraph "SSO Integration Layer"  
        SAML\[SAML 2.0 Handler\]  
        OIDC\[OpenID Connect\]  
        OAUTH\[OAuth 2.0\]  
        SOCIAL\_AUTH\[Social Auth\]  
    end  
      
    subgraph "BAIV Authentication"  
        SSO\_BROKER\[SSO Broker\]  
        JWT\_SVC\[JWT Service\]  
        ROLE\_MAPPER\[Role Mapper\]  
        TENANT\_RESOLVER\[Tenant Resolver\]  
    end  
      
    subgraph "User Management"  
        USER\_STORE\[User Directory\]  
        ROLE\_STORE\[Role Repository\]  
        TENANT\_CONFIG\[Tenant SSO Config\]  
    end  
      
    ENTERPRISE \--\>|SAML| SAML  
    MSAD \--\>|OIDC| OIDC  
    GOOGLE \--\>|OAuth 2.0| OAUTH  
    OKTA \--\>|SAML/OIDC| SAML  
    OKTA \--\>|OIDC| OIDC  
    SOCIAL \--\>|OAuth| SOCIAL\_AUTH  
      
    SAML \--\> SSO\_BROKER  
    OIDC \--\> SSO\_BROKER  
    OAUTH \--\> SSO\_BROKER  
    SOCIAL\_AUTH \--\> SSO\_BROKER  
      
    SSO\_BROKER \--\> TENANT\_RESOLVER  
    SSO\_BROKER \--\> ROLE\_MAPPER  
    SSO\_BROKER \--\> JWT\_SVC  
      
    TENANT\_RESOLVER \--\> TENANT\_CONFIG  
    ROLE\_MAPPER \--\> ROLE\_STORE  
    JWT\_SVC \--\> USER\_STORE  
      
    style SSO\_BROKER fill:\#ff9999  
    style ENTERPRISE fill:\#99ff99  
    style ROLE\_MAPPER fill:\#ffff99  
\`\`\`

\#\#\# 7.2 SSO Authentication Flow

\*\*Purpose:\*\* Detailed authentication sequence showing SSO integration with role mapping and tenant resolution.

\`\`\`mermaid  
sequenceDiagram  
    participant U as User  
    participant FE as Frontend App  
    participant SSO as SSO Broker  
    participant IDP as Identity Provider  
    participant TR as Tenant Resolver  
    participant RM as Role Mapper  
    participant JWT as JWT Service  
    participant DB as Supabase  
      
    U-\>\>FE: Access BAIV Platform  
    FE-\>\>SSO: Request Authentication  
    SSO-\>\>FE: Redirect to Login Options  
      
    alt Enterprise SSO  
        U-\>\>SSO: Select Enterprise Login  
        SSO-\>\>IDP: SAML/OIDC Request  
        IDP-\>\>U: Enterprise Login Page  
        U-\>\>IDP: Enter Credentials  
        IDP-\>\>SSO: SAML/OIDC Response \+ Claims  
    else Social Login  
        U-\>\>SSO: Select Social Provider  
        SSO-\>\>IDP: OAuth Request  
        IDP-\>\>U: Social Login Page  
        U-\>\>IDP: Authorize Access  
        IDP-\>\>SSO: OAuth Token \+ Profile  
    end  
      
    SSO-\>\>TR: Resolve Tenant from Claims  
    TR-\>\>DB: Query Tenant Configuration  
    DB-\>\>TR: Return Tenant Details  
      
    SSO-\>\>RM: Map Identity to BAIV Roles  
    RM-\>\>DB: Query Role Mappings  
    DB-\>\>RM: Return Role Configuration  
      
    RM-\>\>RM: Determine User Roles  
    Note over RM: \- Direct User\<br/\>- Consultant\<br/\>- Agency\<br/\>- Affiliate\<br/\>- White Label Agent  
      
    SSO-\>\>JWT: Generate JWT Token  
    JWT-\>\>JWT: Include Role Claims  
    Note over JWT: JWT Contains:\<br/\>- User Identity\<br/\>- Tenant Context\<br/\>- Role Permissions\<br/\>- Affiliate Attribution  
      
    JWT-\>\>SSO: Return Signed JWT  
    SSO-\>\>FE: Authentication Success \+ JWT  
    FE-\>\>FE: Store JWT \+ Redirect to Dashboard  
      
    Note over U,DB: Subsequent API calls include JWT\<br/\>for authorization and RLS enforcement  
\`\`\`

\-----

\#\# 8\. Business Model Integration

\#\#\# 8.1 Payment and Commission Architecture

\*\*Purpose:\*\* Shows the financial flow and commission tracking system integrated with Stripe.

\`\`\`mermaid  
graph LR  
    subgraph "Payment Processing"  
        CLIENT\[Client\]  
        STRIPE\[Stripe Gateway\]  
        BAIV\_REV\[BAIV Revenue\]  
    end  
      
    subgraph "Commission Distribution"  
        AFFILIATE\[Affiliate\]  
        AGENT\[Agent/White Label\]  
        COMMISSION\_CALC\[Commission Calculator\]  
        ATTRIBUTION\[Attribution Engine\]  
    end  
      
    subgraph "Subscription Management"  
        MONTHLY\[Monthly Bundles\]  
        ANNUAL\[Annual Bundles\]  
        BUNDLE\_FEATURES\[Bundle Features\]  
    end  
      
    CLIENT \--\>|Pays Subscription| STRIPE  
    STRIPE \--\>|Processes Payment| BAIV\_REV  
    BAIV\_REV \--\>|Calculates Commission| COMMISSION\_CALC  
      
    ATTRIBUTION \--\>|Tracks Referral| COMMISSION\_CALC  
    COMMISSION\_CALC \--\>|Pays Commission| AFFILIATE  
    COMMISSION\_CALC \--\>|Pays Agent Fee| AGENT  
      
    CLIENT \--\>|Selects| MONTHLY  
    CLIENT \--\>|Selects| ANNUAL  
    MONTHLY \--\>|Defines| BUNDLE\_FEATURES  
    ANNUAL \--\>|Defines| BUNDLE\_FEATURES  
    BUNDLE\_FEATURES \--\>|Controls| AGENT\_ACCESS\[Agent Access Level\]  
      
    style STRIPE fill:\#00ff00  
    style COMMISSION\_CALC fill:\#ffff00  
    style BUNDLE\_FEATURES fill:\#ff9999  
\`\`\`

\-----

\#\# 9\. Deployment and Infrastructure

\#\#\# 9.1 Cloud Deployment Architecture

\*\*Purpose:\*\* High-level cloud deployment architecture including SSO integration for the BAIV platform.

\`\`\`mermaid  
graph TB  
    subgraph "Frontend Layer"  
        WEB\[Web Application\]  
        MOBILE\[Mobile App\]  
        DASHBOARD\[Admin Dashboard\]  
    end  
      
    subgraph "API Gateway & Auth"  
        GATEWAY\[API Gateway/Load Balancer\]  
        SSO\_BROKER\[SSO Broker Service\]  
        JWT\_VALIDATOR\[JWT Validator\]  
        RLS\_GATE\[RLS Gateway\]  
    end  
      
    subgraph "Identity Integration"  
        SAML\_HANDLER\[SAML Handler\]  
        OIDC\_HANDLER\[OIDC Handler\]  
        OAUTH\_HANDLER\[OAuth Handler\]  
        ROLE\_MAPPER\[Role Mapper\]  
        TENANT\_RESOLVER\[Tenant Resolver\]  
    end  
      
    subgraph "Application Layer"  
        SESSION\_MGR\[Session Manager\]  
        AGENT\_ORCHESTRATOR\[Agent Orchestrator\]  
        CONSULTATION\_SVC\[Consultation Service\]  
        USER\_MGR\[User Management\]  
    end  
      
    subgraph "AI Processing Layer"  
        W4M\_ENGINE\[Wings4Mind.ai Engine\]  
        P1\_P6\[Agents P1-P6 (MVP1)\]  
        P7\_P16\[Agents P7-P16 (Future)\]  
        ONTOLOGY\_SVC\[Ontology Service\]  
    end  
      
    subgraph "Data Layer"  
        SUPABASE\[Supabase (Primary DB)\]  
        CACHE\[Redis Cache\]  
        FILE\_STORAGE\[File Storage\]  
        SSO\_CONFIG\[SSO Configuration Store\]  
    end  
      
    subgraph "External Services"  
        STRIPE\_API\[Stripe API\]  
        SCHEMA\_ORG\[Schema.org Validation\]  
        AUDIT\_LOG\[Audit Logging\]  
        EXT\_IDP\[External Identity Providers\]  
    end  
      
    WEB \--\> GATEWAY  
    MOBILE \--\> GATEWAY  
    DASHBOARD \--\> GATEWAY  
      
    GATEWAY \--\> SSO\_BROKER  
    SSO\_BROKER \--\> SAML\_HANDLER  
    SSO\_BROKER \--\> OIDC\_HANDLER  
    SSO\_BROKER \--\> OAUTH\_HANDLER  
      
    SAML\_HANDLER \--\> EXT\_IDP  
    OIDC\_HANDLER \--\> EXT\_IDP  
    OAUTH\_HANDLER \--\> EXT\_IDP  
      
    SSO\_BROKER \--\> ROLE\_MAPPER  
    SSO\_BROKER \--\> TENANT\_RESOLVER  
    SSO\_BROKER \--\> JWT\_VALIDATOR  
      
    JWT\_VALIDATOR \--\> RLS\_GATE  
    RLS\_GATE \--\> SESSION\_MGR  
    RLS\_GATE \--\> CONSULTATION\_SVC  
    RLS\_GATE \--\> USER\_MGR  
      
    ROLE\_MAPPER \--\> SSO\_CONFIG  
    TENANT\_RESOLVER \--\> SSO\_CONFIG  
      
    SESSION\_MGR \--\> AGENT\_ORCHESTRATOR  
    AGENT\_ORCHESTRATOR \--\> W4M\_ENGINE  
    AGENT\_ORCHESTRATOR \--\> P1\_P6  
    AGENT\_ORCHESTRATOR \--\> P7\_P16  
      
    SESSION\_MGR \--\> SUPABASE  
    USER\_MGR \--\> SUPABASE  
    CONSULTATION\_SVC \--\> SUPABASE  
      
    SESSION\_MGR \--\> CACHE  
    AGENT\_ORCHESTRATOR \--\> ONTOLOGY\_SVC  
    ONTOLOGY\_SVC \--\> SCHEMA\_ORG  
      
    USER\_MGR \--\> STRIPE\_API  
    SESSION\_MGR \--\> AUDIT\_LOG  
    AGENT\_ORCHESTRATOR \--\> AUDIT\_LOG  
      
    style SUPABASE fill:\#00ff00  
    style W4M\_ENGINE fill:\#ff9999  
    style SSO\_BROKER fill:\#ff9999  
    style RLS\_GATE fill:\#ffff99  
    style EXT\_IDP fill:\#99ff99  
\`\`\`

\-----

\#\# 10\. Implementation Guidelines

\#\#\# 10.1 State Persistence Strategy

\#\#\#\# Session State Management

1\. \*\*Primary Storage\*\*: Supabase JSONB fields for structured session data  
1\. \*\*Version Control\*\*: Immutable session snapshots with timestamp versioning  
1\. \*\*State Transitions\*\*: Atomic updates with rollback capability  
1\. \*\*Concurrent Access\*\*: Optimistic locking with conflict resolution

\#\#\#\# Agent Context Persistence

1\. \*\*Active Sessions\*\*: Redis cache for real-time agent state  
1\. \*\*Long-term Storage\*\*: Supabase for completed agent executions  
1\. \*\*Context Chaining\*\*: Persistent links between agent processing stages  
1\. \*\*Recovery Mechanisms\*\*: State reconstruction from audit logs

\#\#\# 10.2 Security Implementation

\#\#\#\# Row Level Security (RLS)

\`\`\`sql  
\-- Example RLS Policy for Session Access  
CREATE POLICY session\_access\_policy ON sessions  
    FOR ALL TO authenticated  
    USING (  
        \-- Users can access their own sessions  
        user\_id \= auth.uid()  
        OR  
        \-- Agents can access managed client sessions  
        EXISTS (  
            SELECT 1 FROM account\_relationships   
            WHERE agent\_id \= auth.uid()   
            AND client\_id \= sessions.user\_id  
            AND relationship\_type \= 'managed'  
        )  
        OR  
        \-- Consultants can access tenant sessions  
        EXISTS (  
            SELECT 1 FROM user\_roles ur   
            JOIN tenant\_access ta ON ur.tenant\_id \= ta.tenant\_id  
            WHERE ur.user\_id \= auth.uid()   
            AND ta.client\_id \= sessions.user\_id  
            AND ur.role\_type IN ('consultant\_activist', 'consultant\_tenant')  
        )  
    );  
\`\`\`

\#\#\#\# JWT Token Structure

\`\`\`json  
{  
  "sub": "user\_uuid",  
  "email": "user@example.com",  
  "role": "consultant\_activist",  
  "tenant\_id": "tenant\_uuid",  
  "affiliate\_id": "affiliate\_uuid",  
  "permissions": \["session:read", "session:create", "client:manage"\],  
  "sso\_provider": "microsoft",  
  "iat": 1640995200,  
  "exp": 1641081600  
}  
\`\`\`

\#\#\# 10.3 Scalability Features

\#\#\#\# Horizontal Scaling Strategy

1\. \*\*Stateless Services\*\*: All application logic in stateless containers  
1\. \*\*Database Scaling\*\*: Supabase connection pooling with read replicas  
1\. \*\*Cache Distribution\*\*: Redis Cluster for distributed caching  
1\. \*\*Load Balancing\*\*: Sticky sessions for WebSocket connections

\#\#\#\# Performance Optimization

1\. \*\*Agent Processing\*\*: Async queue-based execution with worker pools  
1\. \*\*Database Queries\*\*: Optimized indexes on frequently accessed fields  
1\. \*\*API Rate Limiting\*\*: Per-user/tenant rate limiting with burst allowance  
1\. \*\*CDN Integration\*\*: Static asset delivery and API response caching

\-----

\#\# 11\. MVP1 Scope and Future Roadmap

\#\#\# MVP1 Features (Current Implementation)

\- \*\*User Roles\*\*: Direct users, consultants, agencies (up to 5 users), affiliates, clients  
\- \*\*Agent Processing\*\*: P1-P6/7 agents with basic orchestration  
\- \*\*Session Management\*\*: Create, resume, complete, lock, duplicate scenarios  
\- \*\*Authentication\*\*: SSO with SAML, OIDC, OAuth, and social logins  
\- \*\*Payments\*\*: Stripe integration with basic subscription management  
\- \*\*White Labeling\*\*: Basic co-branding with “Powered by” attribution

\#\#\# Future Enhancements (Post-MVP1)

\- \*\*Extended Agent Suite\*\*: P7-P16 agents with advanced capabilities  
\- \*\*Advanced Analytics\*\*: Machine learning insights on consultation outcomes  
\- \*\*Mobile Applications\*\*: Native iOS and Android applications  
\- \*\*API Marketplace\*\*: Third-party integration ecosystem  
\- \*\*Advanced Reporting\*\*: Custom dashboard creation and advanced metrics  
\- \*\*Multi-language Support\*\*: Internationalization and localization

\#\#\# Technical Debt and Refactoring Priorities

1\. \*\*Performance Optimization\*\*: Database query optimization and caching strategies  
1\. \*\*Security Hardening\*\*: Enhanced audit trails and compliance certifications  
1\. \*\*Code Quality\*\*: Test coverage improvement and code documentation  
1\. \*\*Monitoring Enhancement\*\*: Comprehensive observability and alerting systems

\-----

\#\# 12\. Appendices

\#\#\# 12.1 Glossary of Terms

|Term                |Definition                                             |  
|--------------------|-------------------------------------------------------|  
|\*\*BAIV\*\*            |Be AI Visible \- The primary platform organization      |  
|\*\*W4M\*\*             |Wings4Mind.ai \- The AI engine powering agent processing|  
|\*\*PF Tenant\*\*       |Platform tenant other than BAIV with their own branding|  
|\*\*RLS\*\*             |Row Level Security \- Database-level access control     |  
|\*\*SSO\*\*             |Single Sign-On \- Unified authentication across systems |  
|\*\*JIT Provisioning\*\*|Just-in-Time user account creation during first login  |  
|\*\*Agent P1-P16\*\*    |AI processing agents numbered P1 through P16           |  
|\*\*Scenario\*\*        |Consultation template or workflow                      |  
|\*\*Session\*\*         |Individual consultation execution instance             |  
|\*\*Attribution\*\*     |Commission tracking for affiliate referrals            |  
|\*\*White Label\*\*     |Custom branding for agents and partners                |

\#\#\# 12.2 Technical References

\#\#\#\# Standards and Protocols

\- \*\*SAML 2.0\*\*: \[OASIS SAML 2.0 Specification\](https://docs.oasis-open.org/security/saml/v2.0/)  
\- \*\*OpenID Connect\*\*: \[OpenID Connect Specification\](https://openid.net/connect/)  
\- \*\*OAuth 2.0\*\*: \[RFC 6749 \- OAuth 2.0 Authorization Framework\](https://tools.ietf.org/html/rfc6749)  
\- \*\*Schema.org\*\*: \[Schema.org Ontology\](https://schema.org/)  
\- \*\*JWT\*\*: \[RFC 7519 \- JSON Web Token\](https://tools.ietf.org/html/rfc7519)

\#\#\#\# Technology Documentation

\- \*\*Supabase\*\*: \[Supabase Documentation\](https://supabase.com/docs)  
\- \*\*Stripe\*\*: \[Stripe API Documentation\](https://stripe.com/docs/api)  
\- \*\*Redis\*\*: \[Redis Documentation\](https://redis.io/documentation)  
\- \*\*PostgreSQL\*\*: \[PostgreSQL Documentation\](https://www.postgresql.org/docs/)

\#\#\#\# Security Guidelines

\- \*\*OWASP Top 10\*\*: \[OWASP Application Security Risks\](https://owasp.org/www-project-top-ten/)  
\- \*\*NIST Cybersecurity Framework\*\*: \[NIST Guidelines\](https://www.nist.gov/cyberframework)  
\- \*\*SOC 2 Compliance\*\*: \[AICPA SOC 2 Requirements\](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report)

\-----

\*\*End of Document\*\*

\*This document is version-controlled and subject to regular updates as the BAIV platform evolves. For the latest version and technical updates, please refer to the project repository and architecture documentation.\*
