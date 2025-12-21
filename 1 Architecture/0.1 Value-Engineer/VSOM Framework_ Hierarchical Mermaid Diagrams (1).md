<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# VSOM Framework: Hierarchical Mermaid Diagrams

Below are precise Mermaid diagrams to visualize VSOM chaining, C-Suite strategy mapping, and OKR/work breakdown across the organizational cascade. These are optimized for slide usage and can be copied directly into any Mermaid-compatible renderer.

***

## 1. VSOM High-Level Cascade (Vision → Strategy → Objectives → Metrics)

```mermaid
flowchart TD
    V(Vision)
    S(Strategy)
    O(Objectives)
    M(Metrics)

    V --> S
    S --> O
    O --> M
```


***

## 2. Organizational Cascade: VSOM, Functional Strategy, OKR Hierarchy

```mermaid
flowchart TD
    A[Corporate VSOM\n(CEO)]
    B1[Financial VSOM\n(CFO)]
    B2[Operations VSOM\n(COO)]
    B3[Marketing VSOM\n(CMO)]
    B4[HR VSOM\n(CHRO)]
    B5[Tech VSOM\n(CTO)]
    C1[Corporate OKRs]
    C2[Functional OKRs]
    C3[Team OKRs]
    C4[Individual OKRs]
    D1[Projects]
    D2[Processes]
    D3[Campaigns]
    E1[WBS]
    F1[Activities / Tasks]

    A -->|Cascades to| B1
    A --> B2
    A --> B3
    A --> B4
    A --> B5
    A --> C1
    B1 --> C2
    B2 --> C2
    B3 --> C2
    B4 --> C2
    B5 --> C2
    C1 --> C2
    C2 --> C3
    C2 --> C4
    C3 --> D1
    C3 --> D2
    C3 --> D3
    C4 --> D1
    C4 --> D2
    C4 --> D3
    D1 --> E1
    D2 --> E1
    D3 --> E1
    E1 --> F1
```


***

## 3. OKR and Activity Cascade (with RACI/RBAC governance)

```mermaid
flowchart TD
    CORP_OKR["Corporate OKR\n(CEO/Board)"]
    FUNC_OKR["Functional OKR\n(C-Suite)"]
    TEAM_OKR["Team OKR\n(VP/Director)"]
    IND_OKR["Individual OKR\n(Manager/Contributor)"]

    WORKTYPES["Work Types"]
    PROJECT["Project"]
    PROCESS["Process"]
    CAMPAIGN["Campaign"]

    WBS["WBS Structure"]
    TASKS["Tasks\n(Activity Plans)"]

    CORP_OKR --> FUNC_OKR
    FUNC_OKR --> TEAM_OKR
    TEAM_OKR --> IND_OKR

    IND_OKR --> WORKTYPES
    WORKTYPES --> PROJECT
    WORKTYPES --> PROCESS
    WORKTYPES --> CAMPAIGN

    PROJECT --> WBS
    PROCESS --> WBS
    CAMPAIGN --> WBS
    WBS --> TASKS
```


***

## 4. C-Suite Strategic Role Map (including BSC/Blue Ocean connection)

```mermaid
flowchart TD
    CEO["CEO\nCorporate Vision & Strategy"]
    CFO["CFO\nFinancial Excellence"]
    COO["COO\nOperational Excellence"]
    CMO["CMO\nMarket Leadership"]
    CHRO["CHRO\nTalent Development"]
    CTO["CTO\nTechnology Innovation"]

    CEO --->|Financial Perspective| CFO
    CEO --->|Internal Process| COO
    CEO --->|Customer| CMO
    CEO --->|Learning & Growth| CHRO
    CEO --->|Innovation| CTO

    subgraph BSC["Balanced Scorecard Linkage"]
        BSC_F["Financial"]
        BSC_P["Internal Process"]
        BSC_C["Customer"]
        BSC_L["Learning & Growth"]
        BSC_I["Innovation/Tech"]
    end

    CFO --> BSC_F
    COO --> BSC_P
    CMO --> BSC_C
    CHRO --> BSC_L
    CTO --> BSC_I

    subgraph BO["Blue Ocean Actions"]
        EO["Eliminate"]
        RO["Reduce"]
        RA["Raise"]
        CR["Create"]
    end

    CEO --> EO
    CEO --> RO
    CEO --> RA
    CEO --> CR
```


***

## 5. RACI/RBAC Governance Overlay (roles and responsibilities)

```mermaid
flowchart TD
    CEO[CEO]
    CS[C-Suite]
    VP[VP/Director]
    MGR[Manager]
    IC[Individual Contributor]

    CEO -.->|Strategy Accountable| CS
    CS -.->|Functional Accountable| VP
    VP -.->|Team Accountable| MGR
    MGR -.->|Activity Accountable| IC

    CEO ===|Strategic| CS
    CS ===|Tactical| VP
    VP ===|Operational| MGR
    MGR ===|Execution| IC

    CEO -->|RBAC| CS
    CS -->|RBAC| VP
    VP -->|RBAC| MGR
    MGR -->|RBAC| IC

    CEO -->|RACI| CS
    CS -->|RACI| VP
    VP -->|RACI| MGR
    MGR -->|RACI| IC
```


***

## Usage

- Copy and paste each diagram into your Mermaid renderer (Markdown slides, VSCode, Obsidian, etc.) for immediate visualization.
- Each diagram is modular and can be used individually or combined as required for enterprise slides.
- These diagrams precisely reflect the VSOM, strategy, C-Suite cascades, and governance overlays for best-in-class enterprise architecture.

