# OAA Environment Replication Guide v1.0.0

**Purpose:** Duplicate OAA v3.0.0 to a staged/production environment using GitHub  
**Version:** 1.0.0  
**Date:** 2025-12-19  
**Replication Method:** GitHub-based file transfer  
**Target:** Any environment (local, cloud, containerized)

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Replication Strategy](#replication-strategy)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Required Files Checklist](#required-files-checklist)
6. [Environment Configurations](#environment-configurations)
7. [Verification & Testing](#verification--testing)
8. [Troubleshooting](#troubleshooting)

---

## Overview

### What Gets Replicated

```
OAA v3.0.0 Complete System
├── System Prompt (AI Agent Definition)
├── Registry Meta-Ontology (Self-describing registry)
├── Bootstrap Ontologies (5 core ontologies)
├── Documentation (Operating guides, quick reference)
├── Test Suite (Validation tests)
└── Configuration Files (Environment-specific settings)
```

### Replication Approaches

| Approach | Method | Time | Complexity | Use Case |
|----------|--------|------|------------|----------|
| **GitHub Clone** | Clone repo to new environment | 5 min | Low | Dev/staging environments |
| **GitHub Export** | Download ZIP, extract | 10 min | Low | Isolated environments |
| **GitHub Submodule** | Add as submodule to project | 15 min | Medium | Integration into larger project |
| **GitHub Actions** | Automated deployment | 30 min | High | CI/CD pipelines |

**Recommended:** GitHub Clone (simplest, fastest)

---

## Prerequisites

### 1. Source Environment (Current)
✅ OAA v3.0.0 files in PF-Ontologies repository  
✅ GitHub repository: `BAIVTest/PF-Ontologies`  
✅ Branch: `oaa-4.0.0-prd-review` (or `main`)  
✅ Files committed and pushed

### 2. Target Environment (New Staging)
- [ ] Git installed
- [ ] GitHub access (read permissions)
- [ ] Node.js v18+ (if using SDK/CLI)
- [ ] Claude API key (for validation)
- [ ] 500MB+ disk space

### 3. Required Tools
```bash
# Check prerequisites
git --version          # Should show 2.x+
node --version         # Should show v18.x+
npm --version          # Should show 9.x+
```

### 4. Access Requirements
- GitHub account with read access to repository
- SSH key or personal access token configured
- Network access to GitHub and Anthropic API

---

## Replication Strategy

### Architecture Overview

```mermaid
graph LR
    subgraph "Source Environment"
        SRC[PF-Ontologies Repo]
        SRC_BRANCH[oaa-4.0.0-prd-review]
    end
    
    subgraph "GitHub"
        GH[GitHub Repository]
        GH_MAIN[main branch]
        GH_STAGE[staging branch]
    end
    
    subgraph "Target Environment - Staging"
        TGT[Cloned Repository]
        TGT_CONFIG[Environment Config]
        TGT_OAA[OAA v3.0.0 System]
    end
    
    SRC --> GH
    GH --> TGT
    TGT --> TGT_CONFIG
    TGT_CONFIG --> TGT_OAA
    
    style GH fill:#f96,stroke:#333,stroke-width:4px
    style TGT_OAA fill:#9f9,stroke:#333,stroke-width:2px
```

### Transfer Methods Comparison

**Method 1: Direct GitHub Clone (Recommended)**
```bash
# Pros: Simple, preserves git history, easy updates
# Cons: Requires git, downloads entire repo
git clone https://github.com/BAIVTest/PF-Ontologies.git
```

**Method 2: GitHub Export ZIP**
```bash
# Pros: No git required, smaller download
# Cons: No version control, manual updates
# Download: https://github.com/BAIVTest/PF-Ontologies/archive/refs/heads/main.zip
```

**Method 3: Sparse Checkout (OAA files only)**
```bash
# Pros: Minimal download, only OAA files
# Cons: More complex setup
git clone --filter=blob:none --sparse https://github.com/BAIVTest/PF-Ontologies.git
cd PF-Ontologies
git sparse-checkout set "1 PF OAA"
```

---

## Step-by-Step Guide

### Phase 1: Prepare Source Repository (5 minutes)

**Step 1.1: Verify Current State**
```bash
# In your current environment
cd /Users/amandamoore/Documents/PF-Ontologies
git status
git branch
# Should show: oaa-4.0.0-prd-review
```

**Step 1.2: Ensure All Files Are Committed**
```bash
# Check for uncommitted changes
git status

# If changes exist, commit them
git add .
git commit -m "Prepare OAA v3.0.0 for replication"
git push origin oaa-4.0.0-prd-review
```

**Step 1.3: Tag the Release (Optional but Recommended)**
```bash
# Create a release tag for this version
git tag -a oaa-v3.0.0-staging -m "OAA v3.0.0 staging release"
git push origin oaa-v3.0.0-staging
```

**Step 1.4: Document Current Configuration**
```bash
# Save current environment settings
cat > OAA_SOURCE_CONFIG.txt << EOF
Source Environment: $(uname -n)
Git Branch: $(git branch --show-current)
Git Commit: $(git rev-parse HEAD)
Date: $(date)
OAA Version: 3.0.0
Registry Version: 3.0.0
EOF

git add OAA_SOURCE_CONFIG.txt
git commit -m "Document source configuration for replication"
git push
```

### Phase 2: Prepare Target Environment (10 minutes)

**Step 2.1: Set Up Target Directory**
```bash
# SSH into target environment or open terminal
# Create project directory
mkdir -p ~/oaa-staging
cd ~/oaa-staging
```

**Step 2.2: Clone Repository**

**Option A: Full Clone (Recommended)**
```bash
# Clone entire repository
git clone https://github.com/BAIVTest/PF-Ontologies.git
cd PF-Ontologies

# Switch to OAA branch
git checkout oaa-4.0.0-prd-review

# Or use the tag if created
git checkout tags/oaa-v3.0.0-staging
```

**Option B: Sparse Checkout (OAA Only)**
```bash
# Clone with sparse checkout for minimal size
git clone --filter=blob:none --sparse \
  https://github.com/BAIVTest/PF-Ontologies.git
cd PF-Ontologies

git sparse-checkout set "1 PF OAA"
git checkout oaa-4.0.0-prd-review
```

**Option C: Download ZIP (No Git)**
```bash
# Download and extract
curl -L https://github.com/BAIVTest/PF-Ontologies/archive/refs/heads/oaa-4.0.0-prd-review.zip \
  -o oaa.zip
unzip oaa.zip
cd PF-Ontologies-oaa-4.0.0-prd-review
```

**Step 2.3: Verify Files Transferred**
```bash
# Navigate to OAA directory
cd "1 PF OAA"

# Verify critical files exist
ls -la "1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt"
ls -la "PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld"
ls -la "1 OAA-REGISTRY/"

# Count files transferred
find . -type f | wc -l
# Should show 100+ files
```

### Phase 3: Configure Target Environment (15 minutes)

**Step 3.1: Create Environment Configuration**
```bash
# Navigate to OAA root
cd "1 PF OAA"

# Create environment-specific config
cat > .env.staging << 'EOF'
# OAA v3.0.0 Staging Environment Configuration
ENVIRONMENT=staging
OAA_VERSION=3.0.0
REGISTRY_VERSION=3.0.0

# API Keys (replace with actual values)
ANTHROPIC_API_KEY=your-staging-api-key-here

# Paths
OAA_SYSTEM_PROMPT_PATH=./1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt
REGISTRY_META_ONTOLOGY_PATH=./PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld

# Database (if using Supabase or PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/oaa_staging
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Feature Flags
ENABLE_VALIDATION=true
ENABLE_QUALITY_GATES=true
REQUIRE_COMPETENCY_VALIDATION=true
SCHEMA_ORG_ALIGNMENT_THRESHOLD=80
COMPLETENESS_GATE_THRESHOLD=100

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/oaa-staging.log
EOF
```

**Step 3.2: Set Proper Permissions**
```bash
# Protect sensitive files
chmod 600 .env.staging

# Make scripts executable (if using CLI)
chmod +x scripts/*.sh 2>/dev/null || true
```

**Step 3.3: Install Dependencies (if using SDK/CLI)**
```bash
# If package.json exists
if [ -f package.json ]; then
    npm install
fi

# Or create minimal package.json
cat > package.json << 'EOF'
{
  "name": "oaa-staging",
  "version": "3.0.0",
  "description": "OAA v3.0.0 Staging Environment",
  "dependencies": {
    "@anthropic-ai/sdk": "^0.32.0",
    "dotenv": "^16.0.0"
  }
}
EOF

npm install
```

### Phase 4: Bootstrap Registry (10 minutes)

**Step 4.1: Verify Registry Meta-Ontology**
```bash
# Check registry meta-ontology is present
cat "PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld" | head -20

# Validate JSON structure
node -e "JSON.parse(require('fs').readFileSync('PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld'))"
```

**Step 4.2: Load System Prompt**
```bash
# Verify system prompt
wc -l "1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt"
# Should show ~900 lines

# Check version in prompt
head -10 "1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt"
# Should show: Version: 3.0.0
```

**Step 4.3: Initialize Registry Database (Optional)**
```bash
# If using database, run schema migration
# Example for PostgreSQL
psql $DATABASE_URL < schema/registry-v3-schema.sql

# Or if using Supabase
supabase db push
```

### Phase 5: Test & Validate (15 minutes)

**Step 5.1: Test System Prompt Loading**
```bash
# Create simple test script
cat > test-oaa.js << 'EOF'
require('dotenv').config({ path: '.env.staging' });
const fs = require('fs');

// Load system prompt
const promptPath = process.env.OAA_SYSTEM_PROMPT_PATH;
const systemPrompt = fs.readFileSync(promptPath, 'utf8');

console.log('✅ System prompt loaded');
console.log(`   Length: ${systemPrompt.length} characters`);
console.log(`   Lines: ${systemPrompt.split('\n').length}`);

// Load registry ontology
const registryPath = process.env.REGISTRY_META_ONTOLOGY_PATH;
const registryOntology = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

console.log('✅ Registry meta-ontology loaded');
console.log(`   Version: ${registryOntology.version}`);
console.log(`   Entities: ${registryOntology.entities?.length || 0}`);

console.log('\n✅ OAA v3.0.0 staging environment ready!');
EOF

node test-oaa.js
```

**Step 5.2: Test API Connection (if using Claude API)**
```bash
# Create API test script
cat > test-claude-api.js << 'EOF'
require('dotenv').config({ path: '.env.staging' });
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function testAPI() {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 100,
      messages: [{ role: 'user', content: 'Say "OAA test successful"' }],
    });
    console.log('✅ Claude API connection successful');
    console.log(`   Response: ${message.content[0].text}`);
  } catch (error) {
    console.error('❌ Claude API connection failed:', error.message);
  }
}

testAPI();
EOF

node test-claude-api.js
```

**Step 5.3: Validate File Integrity**
```bash
# Create checksum verification script
cat > verify-files.sh << 'EOF'
#!/bin/bash

echo "Verifying OAA v3.0.0 file integrity..."

files=(
  "1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt"
  "PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld"
  "1 OAA-Arch-Reg-Deploy-Test/OAA-v3.0.0-QUICK-START.md"
  "1 OAA-Agent/OAA-ARCHITECTURE-OPERATING-GUIDE-v4.0.0.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ MISSING: $file"
  fi
done

echo ""
echo "✅ Verification complete"
EOF

chmod +x verify-files.sh
./verify-files.sh
```

### Phase 6: Create Usage Documentation (10 minutes)

**Step 6.1: Create Staging README**
```bash
cat > README-STAGING.md << 'EOF'
# OAA v3.0.0 Staging Environment

**Environment:** Staging  
**Cloned From:** BAIVTest/PF-Ontologies  
**Branch:** oaa-4.0.0-prd-review  
**Date Deployed:** [AUTO-GENERATED]

## Quick Start

### 1. Load Environment Variables
```bash
source .env.staging
```

### 2. Use OAA System Prompt
```bash
# Copy system prompt to clipboard
cat "1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt" | pbcopy

# Paste into Claude.ai and start creating ontologies
```

### 3. Access Documentation
- **Quick Start:** `1 OAA-Arch-Reg-Deploy-Test/OAA-v3.0.0-QUICK-START.md`
- **Architecture Guide:** `1 OAA-Agent/OAA-ARCHITECTURE-OPERATING-GUIDE-v4.0.0.md`
- **System Overview:** `1 OAA-Agent/OAA-SYSTEM-OVERVIEW.md`

## Files Included

- System Prompt v3.0.0
- Registry Meta-Ontology v3.0.0
- 5 Core Ontologies
- Complete Documentation
- Test Suite
- Example Data

## Configuration

Environment: `staging`  
API Key: `ANTHROPIC_API_KEY` in `.env.staging`

## Support

See main documentation in `1 PF OAA/` directory.
EOF
```

**Step 6.2: Document Deployment**
```bash
# Create deployment record
cat > DEPLOYMENT_RECORD.txt << EOF
OAA v3.0.0 Staging Deployment

Date: $(date)
Environment: Staging
Source: GitHub - BAIVTest/PF-Ontologies
Branch: oaa-4.0.0-prd-review
Commit: $(git rev-parse HEAD)
Deployed By: $(whoami)
Host: $(hostname)

Files Transferred: $(find "1 PF OAA" -type f | wc -l)
Disk Usage: $(du -sh "1 PF OAA" | awk '{print $1}')

Status: ✅ Deployed and Verified
EOF

cat DEPLOYMENT_RECORD.txt
```

---

## Required Files Checklist

### Core System Files (Must Have)

- [ ] **System Prompt**
  - `1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt` (29KB)
  
- [ ] **Registry Meta-Ontology**
  - `PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld` (50KB)
  - `PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-glossary-v3.json` (10KB)
  - `PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-test-data-v3.jsonld` (15KB)

- [ ] **Documentation**
  - `1 OAA-Arch-Reg-Deploy-Test/OAA-v3.0.0-QUICK-START.md`
  - `1 OAA-Agent/OAA-ARCHITECTURE-OPERATING-GUIDE-v4.0.0.md`
  - `1 OAA-Agent/OAA-SYSTEM-OVERVIEW.md`

### Optional But Recommended

- [ ] **SDK Documentation**
  - `1 OAA-Agent/OAA-SDK-v4.0.0-PRD.md`
  - `1 OAA-Agent/OAA-SDK-v4.0.0-PBS.md`
  - `1 OAA-Agent/OAA-SDK-v4.0.0-SUMMARY.md`

- [ ] **Registry Guides**
  - `1 OAA-REGISTRY/REGISTRY-MANAGEMENT-GUIDE.md`
  - `1 OAA-REGISTRY/oaa-registry-installation-guide.md`

- [ ] **Operational Guides**
  - `1 OAA-Arch-Reg-Deploy-Test/oaa-v1.1-operating-guide.md`
  - `1 OAA-Arch-Reg-Deploy-Test/oaa-deployment-options-final-summary.md`

### Minimum Viable Transfer (10MB)

For minimal setup, transfer only:
1. System Prompt v3.0.0 (29KB)
2. Registry Meta-Ontology v3.0.0 (50KB)
3. Quick Start Guide (10KB)
4. Architecture Guide (80KB)

**Total:** ~170KB

---

## Environment Configurations

### Configuration Matrix

| Environment | Purpose | Database | API Key | Validation Level |
|-------------|---------|----------|---------|------------------|
| **Development** | Local testing | None or local PostgreSQL | Personal key | Relaxed (80% thresholds) |
| **Staging** | Pre-production testing | Shared PostgreSQL or Supabase | Staging key | Production (100% gates) |
| **Production** | Live system | Production PostgreSQL | Production key | Production (100% gates) |

### Environment Variables Template

```bash
# .env.[environment]

# Environment
ENVIRONMENT=staging|production|development
OAA_VERSION=3.0.0
REGISTRY_VERSION=3.0.0

# API Keys
ANTHROPIC_API_KEY=sk-ant-...

# Paths (absolute or relative)
OAA_SYSTEM_PROMPT_PATH=./1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt
REGISTRY_META_ONTOLOGY_PATH=./PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld

# Database (optional)
DATABASE_URL=postgresql://user:pass@host:5432/oaa_[environment]
SUPABASE_URL=https://[project].supabase.co
SUPABASE_ANON_KEY=...

# Feature Flags
ENABLE_VALIDATION=true
ENABLE_QUALITY_GATES=true
REQUIRE_COMPETENCY_VALIDATION=true

# Quality Thresholds
SCHEMA_ORG_ALIGNMENT_THRESHOLD=80
COMPLETENESS_GATE_THRESHOLD=100
COMPETENCY_SCORE_THRESHOLD=90

# Logging
LOG_LEVEL=info|debug|error
LOG_FILE=./logs/oaa-[environment].log
```

### Different Deployment Scenarios

**Scenario 1: Simple Claude.ai Usage**
```bash
# No infrastructure needed
# Just copy system prompt to Claude.ai
cat "1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt" | pbcopy
# Paste into Claude.ai
```

**Scenario 2: CLI Tool with Local Files**
```bash
# Minimal setup
npm install @anthropic-ai/sdk dotenv
export ANTHROPIC_API_KEY=your-key
node oaa-cli.js create --domain="marketing"
```

**Scenario 3: Supabase Backend**
```bash
# Full stack with database
npm install @supabase/supabase-js @anthropic-ai/sdk
export SUPABASE_URL=...
export SUPABASE_ANON_KEY=...
node oaa-server.js
```

**Scenario 4: Docker Container**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY 1\ PF\ OAA /app/oaa
RUN npm install
CMD ["node", "oaa-server.js"]
```

---

## Verification & Testing

### Verification Checklist

**Phase 1: File Transfer Verification**
- [ ] All critical files present (see checklist above)
- [ ] File sizes match source (within 1%)
- [ ] JSON files parse without errors
- [ ] Text files have correct encoding (UTF-8)

**Phase 2: Configuration Verification**
- [ ] Environment variables set correctly
- [ ] API keys valid and working
- [ ] File paths resolve correctly
- [ ] Permissions set appropriately

**Phase 3: Functional Verification**
- [ ] System prompt loads successfully
- [ ] Registry ontology parses correctly
- [ ] Claude API connection works
- [ ] Can create test ontology

**Phase 4: Integration Verification**
- [ ] Database connection (if applicable)
- [ ] File storage access (if applicable)
- [ ] External API access
- [ ] Logging works correctly

### Test Scripts

**Test 1: System Prompt Integrity**
```bash
#!/bin/bash
PROMPT_FILE="1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt"

# Check file exists
if [ ! -f "$PROMPT_FILE" ]; then
  echo "❌ System prompt not found"
  exit 1
fi

# Check version
if grep -q "Version: 3.0.0" "$PROMPT_FILE"; then
  echo "✅ System prompt v3.0.0 verified"
else
  echo "❌ Version mismatch"
  exit 1
fi

# Check line count (should be ~900 lines)
lines=$(wc -l < "$PROMPT_FILE")
if [ $lines -gt 800 ] && [ $lines -lt 1000 ]; then
  echo "✅ Line count acceptable: $lines lines"
else
  echo "⚠️  Line count unusual: $lines lines"
fi
```

**Test 2: Create Test Ontology**
```bash
# Use OAA to create simple ontology
# This verifies end-to-end functionality
cat > test-ontology-creation.txt << 'EOF'
System Prompt: [Load oaa-system-prompt-v3.0.0.txt]

User: Create a simple test ontology for "Books" domain with 2 entities:
- Book (with properties: title, author, ISBN)
- Author (with properties: name, birthYear)

Relationship: Book -> Author (written-by, 1..*)

Validate and generate registry entry.
EOF

# This would be executed via Claude API
echo "Test ontology creation prompt ready"
echo "Execute via Claude API or Claude.ai"
```

**Test 3: Registry Validation**
```javascript
// test-registry.js
const fs = require('fs');

const registryPath = 'PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

console.log('Registry Meta-Ontology Validation:');
console.log(`✅ Name: ${registry.name}`);
console.log(`✅ Version: ${registry.version}`);
console.log(`✅ Entities: ${registry.entities?.length || 0}`);
console.log(`✅ Status: ${registry.status}`);

// Verify critical entities
const criticalEntities = ['OntologyRegistryEntry', 'Tenant', 'OntologyEntity'];
const foundEntities = registry.entities.map(e => e.name);

criticalEntities.forEach(entity => {
  if (foundEntities.includes(entity)) {
    console.log(`✅ ${entity} found`);
  } else {
    console.log(`❌ ${entity} MISSING`);
  }
});
```

---

## Troubleshooting

### Common Issues

**Issue 1: Files Not Found After Clone**

**Symptom:**
```bash
$ ls "1 PF OAA"
ls: 1 PF OAA: No such file or directory
```

**Diagnosis:**
```bash
# Check what was cloned
ls -la
pwd
```

**Solution:**
```bash
# Navigate to correct directory
cd PF-Ontologies
ls -la "1 PF OAA"

# Or reclone with correct path
git clone https://github.com/BAIVTest/PF-Ontologies.git staging-env
cd staging-env
```

**Issue 2: JSON Parse Errors**

**Symptom:**
```
SyntaxError: Unexpected token } in JSON
```

**Diagnosis:**
```bash
# Validate JSON files
node -e "JSON.parse(require('fs').readFileSync('registry-meta-ontology-v3.jsonld'))"
```

**Solution:**
```bash
# Re-download the file
git checkout HEAD -- "PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld"

# Or download directly from GitHub
curl -o registry.jsonld https://raw.githubusercontent.com/BAIVTest/PF-Ontologies/main/path/to/file
```

**Issue 3: API Key Not Working**

**Symptom:**
```
Error: Invalid API key
```

**Diagnosis:**
```bash
# Check API key is set
echo $ANTHROPIC_API_KEY

# Test API key
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":10,"messages":[{"role":"user","content":"test"}]}'
```

**Solution:**
```bash
# Set correct API key
export ANTHROPIC_API_KEY=sk-ant-your-real-key

# Or update .env.staging
nano .env.staging
```

**Issue 4: Permission Denied**

**Symptom:**
```bash
$ node test-oaa.js
EACCES: permission denied
```

**Solution:**
```bash
# Fix permissions
chmod 644 *.js
chmod 755 *.sh
chmod 600 .env.*
```

**Issue 5: Module Not Found**

**Symptom:**
```
Error: Cannot find module '@anthropic-ai/sdk'
```

**Solution:**
```bash
# Install dependencies
npm install
# Or install specific module
npm install @anthropic-ai/sdk
```

---

## Appendix A: Quick Reference Commands

### Clone and Setup (One-liner)
```bash
git clone https://github.com/BAIVTest/PF-Ontologies.git oaa-staging && \
cd oaa-staging && \
git checkout oaa-4.0.0-prd-review && \
cd "1 PF OAA" && \
npm install && \
echo "✅ OAA v3.0.0 staging ready"
```

### Update Existing Environment
```bash
cd oaa-staging/PF-Ontologies
git pull origin oaa-4.0.0-prd-review
echo "✅ OAA updated to latest"
```

### Verify Deployment
```bash
cd "1 PF OAA"
[ -f "1 OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt" ] && echo "✅ System prompt" || echo "❌ System prompt missing"
[ -f "PF OAA-REG Multi-Tenant isolation_files/registry-meta-ontology-v3.jsonld" ] && echo "✅ Registry ontology" || echo "❌ Registry ontology missing"
```

---

## Appendix B: Repository Structure Reference

```
PF-Ontologies/
├── 1 PF OAA/                          # OAA v3.0.0 root
│   ├── 1 OAA-Arch-Reg-Deploy-Test/    # Core system files
│   │   ├── oaa-system-prompt-v3.0.0.txt          ⭐ CRITICAL
│   │   ├── OAA-v3.0.0-QUICK-START.md
│   │   └── OAA-ARCHITECTURE-OPERATING-GUIDE-v4.0.0.md
│   ├── 1 OAA-Agent/                   # SDK documentation
│   │   ├── OAA-SDK-v4.0.0-PRD.md
│   │   ├── OAA-SDK-v4.0.0-PBS.md
│   │   └── OAA-SYSTEM-OVERVIEW.md
│   ├── 1 OAA-REGISTRY/                # Registry management
│   │   ├── REGISTRY-MANAGEMENT-GUIDE.md
│   │   └── registry-entry-*.jsonld
│   └── PF OAA-REG Multi-Tenant isolation_files/  # Registry ontology
│       ├── registry-meta-ontology-v3.jsonld      ⭐ CRITICAL
│       ├── registry-meta-ontology-glossary-v3.json
│       └── registry-meta-ontology-test-data-v3.jsonld
```

---

## Appendix C: GitHub URLs

**Repository:** https://github.com/BAIVTest/PF-Ontologies

**Branches:**
- Main: https://github.com/BAIVTest/PF-Ontologies/tree/main
- OAA Development: https://github.com/BAIVTest/PF-Ontologies/tree/oaa-4.0.0-prd-review

**Direct File Links:**
- System Prompt: https://github.com/BAIVTest/PF-Ontologies/blob/oaa-4.0.0-prd-review/1%20PF%20OAA/1%20OAA-Arch-Reg-Deploy-Test/oaa-system-prompt-v3.0.0.txt
- Registry Ontology: https://github.com/BAIVTest/PF-Ontologies/blob/oaa-4.0.0-prd-review/1%20PF%20OAA/PF%20OAA-REG%20Multi-Tenant%20isolation_files/registry-meta-ontology-v3.jsonld

**Download ZIP:**
- Full Repo: https://github.com/BAIVTest/PF-Ontologies/archive/refs/heads/oaa-4.0.0-prd-review.zip

---

**END OF GUIDE**

*This guide provides complete instructions for replicating OAA v3.0.0 to any environment using GitHub as the transfer mechanism. For support, refer to the main OAA documentation.*

**Document Version:** 1.0.0  
**Created:** 2025-12-19  
**Maintained By:** Platform Architecture Team  
**Next Review:** Q1 2026
