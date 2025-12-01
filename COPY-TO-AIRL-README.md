# Copy Agentic-01 to AIRL Repository

This document provides instructions for copying the Agentic-01 framework files from this repository to the AIRL repository.

## Overview

**Source Repository:** PF-Prototype-Shared  
**Source Path:** `1 Architecture/0.2 Agentic-Engineer/Agentic-01`  
**Target Repository:** https://github.com/ajrmooreuk/AIRL  
**Target Path:** `3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline`

## What's Being Copied

The Agentic-01 directory contains 46 files (approximately 1.2 MB) including:

- Framework manifests and guides
- Architecture strategy documents
- Templates (Agent OKR, PRD, Context Engineering, TDD Framework, Value Proposition)
- Ontology files (JSON-LD format)
- Validation and compliance reports
- Supporting documentation and artifacts

## Method 1: Using the Automated Script

1. Run the copy script:
   ```bash
   ./copy-agentic-01-to-airl.sh
   ```

2. Follow the on-screen instructions

3. Optionally create a tar archive for easy transfer

## Method 2: Manual Copy Process

### Step 1: Clone Both Repositories

```bash
# If you haven't already, clone this repository
git clone https://github.com/ajrmooreuk/PF-Prototype-Shared
cd PF-Prototype-Shared

# Clone the target repository in a separate location
cd ..
git clone https://github.com/ajrmooreuk/AIRL
cd AIRL
```

### Step 2: Create Target Directory

```bash
# Ensure the target directory structure exists
mkdir -p "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline"
```

### Step 3: Copy Files

```bash
# Copy all Agentic-01 contents to the target location
cp -r ../PF-Prototype-Shared/"1 Architecture/0.2 Agentic-Engineer/Agentic-01"/* "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline/"
```

### Step 4: Verify and Commit

```bash
# Check what was copied
ls -la "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline/"

# Stage the changes
git add "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline"

# Commit the changes
git commit -m "Add Agentic-01 framework files from PF-Prototype-Shared

Copied from PF-Prototype-Shared/1 Architecture/0.2 Agentic-Engineer/Agentic-01
Includes framework manifests, guides, templates, and ontology files"

# Push to the repository
git push origin main
```

## Method 3: Using Archive Transfer

### Create Archive

```bash
cd PF-Prototype-Shared
tar -czf agentic-01-export.tar.gz -C "1 Architecture/0.2 Agentic-Engineer" "Agentic-01"
```

### Extract in Target Repository

```bash
cd ../AIRL
mkdir -p "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline"
tar -xzf ../PF-Prototype-Shared/agentic-01-export.tar.gz -C "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline" --strip-components=1
```

### Commit Changes

```bash
git add "3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline"
git commit -m "Add Agentic-01 framework files"
git push origin main
```

## File Manifest

The following files will be copied:

### Framework Documents
- `PF-Core Agentic Framework_Manifest_v1.1.0.md`
- `PF-Core_PF-Agentic-Framework_Manifest_v1.0.0.md`
- Various duplicates with different naming conventions

### Guides
- `PF-Core Agentic Framework_Guide_Long-Running-Agents_v1.0.0.md`
- `PF-Core Agentic Framework_Guide_Tool-Engineering-ACI_v1.0.0.md`
- `PF-Core_PF-Agentic-Framework_Guide_Long-Running-Agents_v1.0.0.md`
- `PF-Core_PF-Agentic-Framework_Guide_Tool-Engineering-ACI_v1.0.0.md`

### Strategy Documents
- `PF-Core Agentic Framework_Strategy_Parameterized-Architecture_v2.0.0.md`
- `PF-Core Agentic Framework_Strategy_VSOM-Agent-Architecture_v1.0.0.md`
- `PF-Core_PF-Agentic-Framework_Strategy_Parameterized-Architecture_v2.0.0.md`
- `PF-Core_PF-Agentic-Framework_Strategy_VSOM-Agent-Architecture_v1.0.0.md`

### Templates
- `PF-Core Agentic Framework_Template_Agent-OKR_v1.0.0.md`
- `PF-Core Agentic Framework_Template_Agent-PRD-14-Section_v2.0.0.md`
- `PF-Core Agentic Framework_Template_Agent-PRD_v1.0.0.md`
- `PF-Core Agentic Framework_Template_Context-Engineering_v1.0.0.md`
- `PF-Core Agentic Framework_Template_TDD-Framework_v1.0.0.md`
- `PF-Core Agentic Framework_Template_Value-Proposition_v1.0.0.md`
- Similar files with `PF-Core_PF-Agentic-Framework_` prefix

### Addenda
- `PF-Core Agentic Framework_Addendum_OAA-Ontology-Integration_v1.0.0.md`
- `PF-Core_PF-Agentic-Framework_Addendum_OAA-Ontology-Integration_v1.0.0.md`

### Validation
- `PF-Core Agentic Framework_Validation_Anthropic-Compliance-Report_v1.0.0.md`
- `PF-Core_PF-Agentic-Framework_Validation_Anthropic-Compliance-Report_v1.0.0.md`

### Context Engineering
- `PF-Core_Context_Engr_Exploration_v1.4_EXP.md`
- `PF-Core_Context_Engr_VE_OKR_v1.0_VSOM.md`
- `PF-Core_Context_Engr_VSOM_Framework_v1.2_VSOM.md`

### Ontology Files (JSON-LD)
- `PF-Core_VE_OKR_Ontology_v1.0.0.jsonld`
- `PF-Core_VE_VSOM_Ontology_v1.0.0.jsonld`

### Value Engineering
- `PF-Core_VE_ValueProposition_AgentDef-Wizard_v1.0.0.json`
- `PF-Core_VE_ValueProposition_Catalogue-Chats_v1.0.0.md`
- `PF-Core_VE_ValueProposition_Diagram-Cascade_v1.0.0.mermaid`
- `PF-Core_VE_ValueProposition_Diagram-MindMap_v1.0.0.mermaid`
- `PF-Core_VE_ValueProposition_Glossary_v1.0.0.md`
- `PF-Core_VE_ValueProposition_README_v1.0.0.md`
- `PF-Core_VE_ValueProposition_Registry-OAA_v3.0.0.json`
- `PF-Core_VE_ValueProposition_TestData-BAIV_v1.0.0.json`

### Other
- `readme.md`

## Notes

- Some files appear to have duplicates with slightly different naming conventions (with and without spaces in "PF-Core Agentic Framework" vs "PF-Core_PF-Agentic-Framework")
- Files with `(1)` and `(2)` suffixes appear to be duplicates
- The total size is approximately 1.2 MB
- All files are documentation and configuration files (Markdown, JSON, JSON-LD, Mermaid)

## Verification

After copying, verify that:
1. All 46 files are present in the target location
2. File sizes match the source files
3. The directory structure is maintained
4. The readme.md file is present and readable

## Support

If you encounter any issues during the copy process, please check:
- You have write access to the AIRL repository
- The target directory path is correct
- File permissions are properly set
- No conflicts exist with existing files

For questions or issues, please contact the repository maintainers.
