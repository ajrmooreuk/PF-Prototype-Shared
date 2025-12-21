# CI/CD Agent Platform Decision Analysis

## Coolify (Self-Hosted PaaS) vs Digital Ocean (Direct IaaS)

**Strategic Evaluation for PF-CORE Platform Foundation**

---

| Field | Value |
|-------|-------|
| **Document ID** | DECISION-PF-CICD-001 |
| **Version** | 1.0.0 |
| **Date** | December 2025 |
| **Decision Owner** | Platform Architecture |
| **Classification** | CONFIDENTIAL |

---

## Executive Summary

This analysis evaluates two architectural approaches for the PF-CORE CI/CD Automation Agent:

| Approach | Description | Recommendation |
|----------|-------------|----------------|
| **Option A: Coolify** | Self-hosted PaaS on Hetzner | ⭐ **RECOMMENDED** |
| **Option B: DO Direct** | Custom scripts on Digital Ocean Droplets | Alternative |

**Primary Recommendation: Coolify** for MVP through initial scaling phase, with migration path to Kubernetes for enterprise scale.

---

## 1. Evaluation Framework

### 1.1 Weighted Criteria

| Criterion | Weight | Rationale |
|-----------|--------|-----------|
| **Time to MVP** | 25% | Speed to validate product-market fit |
| **Operational Complexity** | 20% | Ongoing maintenance burden |
| **Cost Efficiency** | 15% | Total cost of ownership |
| **Scalability** | 15% | Growth path to 100+ clients |
| **Control & Flexibility** | 10% | Customisation capabilities |
| **Developer Experience** | 10% | Team productivity |
| **Risk Profile** | 5% | Failure modes and recovery |

---

## 2. Detailed Comparison

### 2.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        OPTION A: COOLIFY                                     │
│                                                                              │
│   Developer → GitHub → Webhook → Coolify → Docker → Traefik → Live          │
│                                    │                                         │
│                              ┌─────┴─────┐                                  │
│                              │  Coolify  │                                  │
│                              │  Dashboard│                                  │
│                              │  + API    │                                  │
│                              └───────────┘                                  │
│                                                                              │
│   • Single server manages all deployments                                   │
│   • Built-in environment management                                         │
│   • Automatic SSL, domains, rollbacks                                       │
│   • MCP Server available for Claude integration                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        OPTION B: DO DIRECT                                   │
│                                                                              │
│   Developer → GitHub → Actions → SSH → Droplet → PM2/Docker → Nginx → Live │
│                                    │                                         │
│                              ┌─────┴─────┐                                  │
│                              │  Custom   │                                  │
│                              │  Scripts  │                                  │
│                              │  + Agent  │                                  │
│                              └───────────┘                                  │
│                                                                              │
│   • Direct control over each droplet                                        │
│   • Custom bootstrap and deployment scripts                                 │
│   • Manual SSL via Certbot                                                  │
│   • Custom tools required for Claude integration                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.2 Time to MVP

| Factor | Coolify | DO Direct | Winner |
|--------|---------|-----------|--------|
| **Infrastructure Setup** | 3 days | 5 days | Coolify |
| **Deployment Pipeline** | 2 days (MCP exists) | 4.5 days (custom) | Coolify |
| **SSL/Domain Config** | 0.5 days (automatic) | 1.5 days (manual) | Coolify |
| **Environment Management** | Native | Custom scripts | Coolify |
| **Agent Development** | 10 days | 12 days | Coolify |
| **Testing & Documentation** | 13 days | 13 days | Tie |
| **Total Effort** | **55 days** | **59 days** | **Coolify (-7%)** |

**Score: Coolify 9/10, DO Direct 7/10**

---

### 2.3 Operational Complexity

| Factor | Coolify | DO Direct | Winner |
|--------|---------|-----------|--------|
| **Server Management** | Coolify handles Docker, networking | Manual per droplet | Coolify |
| **SSL Renewal** | Automatic (Let's Encrypt) | Certbot cron jobs | Coolify |
| **Deployments** | Git push + webhook | SSH + custom scripts | Coolify |
| **Rollbacks** | One API call | Custom rollback scripts | Coolify |
| **Log Aggregation** | Built-in dashboard | Custom setup needed | Coolify |
| **Resource Monitoring** | Built-in dashboard | External tools needed | Coolify |
| **Updates** | `docker pull coolify` | OS + app updates | Coolify |
| **Backup** | Single server backup | Multiple droplet backups | Coolify |

**Operational Tasks Comparison:**

| Task | Coolify Time | DO Direct Time |
|------|--------------|----------------|
| Add new environment | 2 minutes | 30 minutes |
| Deploy hotfix | 1 minute | 5 minutes |
| Rollback | 30 seconds | 5 minutes |
| Check logs | 10 seconds | 1 minute |
| SSL certificate issue | Automatic | 15 minutes |
| Add new domain | 1 minute | 10 minutes |

**Score: Coolify 9/10, DO Direct 5/10**

---

### 2.4 Cost Analysis

#### Infrastructure Costs (Monthly)

| Scale | Apps | Coolify (Hetzner) | DO Direct | DO App Platform |
|-------|------|-------------------|-----------|-----------------|
| **MVP** | 3 | €13 (CPX21) | $24 (1×$24) | $45 (3×$15) |
| **Small** | 9 | €25 (CPX31) | $24 (1×$24) | $135 (9×$15) |
| **Medium** | 20 | €25 (CPX31) | $49 (1×$49) | $300 (20×$15) |
| **Large** | 50 | €45 (CPX41) | $96 (2×$48) | $750 (50×$15) |
| **Scale** | 100 | €90 (CPX51) | $192 (4×$48) | $1,500 |

#### Total Cost of Ownership (Year 1)

| Cost Category | Coolify | DO Direct |
|---------------|---------|-----------|
| Infrastructure (12 mo @ medium) | €300 | $588 |
| Development (55-59 days @ $800/day) | $44,000 | $47,200 |
| Ongoing maintenance (10 hrs/mo @ $100) | $12,000 | $18,000 |
| **Total Year 1** | **~$56,300** | **~$65,788** |
| **Savings** | **$9,488 (14%)** | - |

**Score: Coolify 8/10, DO Direct 6/10**

---

### 2.5 Scalability

| Factor | Coolify | DO Direct | Winner |
|--------|---------|-----------|--------|
| **Vertical Scaling** | Upgrade Hetzner server | Upgrade droplet | Tie |
| **Horizontal Scaling** | Multiple Coolify servers | Multiple droplets | Tie |
| **Multi-Region** | Separate Coolify per region | Native DO regions | DO Direct |
| **Load Balancing** | Traefik (built-in) | DO Load Balancer | Tie |
| **Auto-Scaling** | Manual | DO Kubernetes | DO Direct |
| **Container Orchestration** | Docker Swarm (future) | Kubernetes option | DO Direct |
| **Apps per Server** | ~50-100 per server | Unlimited (separate) | Tie |

**Scaling Paths:**

```
COOLIFY SCALING PATH:
MVP (1 server, 10 apps) → Scale (1 server, 50 apps) → Multi-Server (2+ servers)
                                                            ↓
                                                    Kubernetes migration
                                                    (if >100 apps needed)

DO DIRECT SCALING PATH:
MVP (1 droplet) → Scale (larger droplet) → Multi-Droplet → Kubernetes
```

**Score: Coolify 7/10, DO Direct 8/10**

---

### 2.6 Control & Flexibility

| Factor | Coolify | DO Direct | Winner |
|--------|---------|-----------|--------|
| **Deployment Customisation** | Nixpacks/Dockerfile | Full control | DO Direct |
| **Network Configuration** | Traefik abstracted | Full control | DO Direct |
| **OS-Level Access** | SSH available | Full control | Tie |
| **Custom Buildpacks** | Nixpacks + Dockerfile | Anything | DO Direct |
| **Database Options** | Coolify-managed or external | Full control | DO Direct |
| **Service Integration** | Via Coolify services | Direct integration | DO Direct |
| **Vendor Lock-in** | Coolify (open source) | None | DO Direct |

**Score: Coolify 6/10, DO Direct 9/10**

---

### 2.7 Developer Experience

| Factor | Coolify | DO Direct | Winner |
|--------|---------|-----------|--------|
| **Onboarding Time** | 1 day | 3 days | Coolify |
| **Deployment Workflow** | Git push → auto-deploy | Git push → Actions → SSH | Coolify |
| **Environment Visibility** | Dashboard | CLI/custom tools | Coolify |
| **Log Access** | Web UI + API | SSH required | Coolify |
| **Rollback Speed** | One click | Run scripts | Coolify |
| **Preview Deployments** | Native support | Custom setup | Coolify |
| **Learning Curve** | Low (PaaS abstractions) | Medium (IaaS knowledge) | Coolify |

**Score: Coolify 9/10, DO Direct 6/10**

---

### 2.8 Risk Profile

| Risk | Coolify | DO Direct | Mitigation |
|------|---------|-----------|------------|
| **Single Point of Failure** | Coolify server | Per-app droplet | Backups, multi-server |
| **Vendor Dependency** | Coolify OSS project | DigitalOcean | OSS = lower risk |
| **Skill Requirements** | Docker basics | Full DevOps | Training |
| **Recovery Time** | Restore Coolify | Rebuild scripts | Documentation |
| **Security Surface** | Coolify + apps | Apps only | Hardening |
| **Update Disruption** | Coolify updates | OS updates | Staging first |

**Risk Scores:**

| Risk Type | Coolify | DO Direct |
|-----------|---------|-----------|
| Operational Risk | Medium | High |
| Vendor Risk | Low (OSS) | Low |
| Security Risk | Medium | Medium |
| Recovery Risk | Low | Medium |

**Score: Coolify 7/10, DO Direct 6/10**

---

## 3. Weighted Score Summary

| Criterion | Weight | Coolify | DO Direct |
|-----------|--------|---------|-----------|
| Time to MVP | 25% | 9 (2.25) | 7 (1.75) |
| Operational Complexity | 20% | 9 (1.80) | 5 (1.00) |
| Cost Efficiency | 15% | 8 (1.20) | 6 (0.90) |
| Scalability | 15% | 7 (1.05) | 8 (1.20) |
| Control & Flexibility | 10% | 6 (0.60) | 9 (0.90) |
| Developer Experience | 10% | 9 (0.90) | 6 (0.60) |
| Risk Profile | 5% | 7 (0.35) | 6 (0.30) |
| **TOTAL** | **100%** | **8.15** | **6.65** |

---

## 4. Scenario Analysis

### 4.1 When Coolify is Better

✅ **Choose Coolify if:**

- MVP speed is critical (validating PMF quickly)
- Small team without dedicated DevOps
- Running 10-50 applications
- Cost optimisation is important
- Prefer managed abstractions over custom scripts
- Value developer experience and fast iterations
- Single-region deployment is acceptable initially

### 4.2 When DO Direct is Better

✅ **Choose DO Direct if:**

- Need multi-region from day one
- Have dedicated DevOps resources
- Require deep infrastructure customisation
- Planning for Kubernetes migration soon
- Running 100+ applications
- Need specific networking configurations
- Prefer no additional abstraction layers

---

## 5. Hybrid Approach Option

Consider a **staged approach** that leverages both:

```
PHASE 1 (MVP - Month 1-6): COOLIFY
├── Fast deployment
├── Low operational overhead
├── Validate product-market fit
└── Cost: ~€25/month

PHASE 2 (Scale - Month 6-12): COOLIFY MULTI-SERVER
├── Add second Coolify server for redundancy
├── Geographic distribution if needed
├── Still simple operations
└── Cost: ~€50-90/month

PHASE 3 (Enterprise - Month 12+): EVALUATE
├── Option A: Continue with Coolify (if <100 apps)
├── Option B: Migrate to DO Kubernetes (if >100 apps)
├── Option C: Hybrid (Coolify for simple, K8s for complex)
└── Decision based on actual scale needs
```

---

## 6. Decision Matrix

### 6.1 Go/No-Go Criteria

| Criterion | Coolify | DO Direct | Threshold |
|-----------|---------|-----------|-----------|
| Can deploy Next.js apps? | ✅ Yes | ✅ Yes | Must |
| Supports 3 environments? | ✅ Yes | ✅ Yes | Must |
| GitHub integration? | ✅ Yes | ✅ Yes | Must |
| Supabase compatible? | ✅ Yes | ✅ Yes | Must |
| Claude Agent integration? | ✅ MCP exists | ⚠️ Custom | Should |
| Auto SSL? | ✅ Yes | ⚠️ Manual | Should |
| Cost < $100/mo for MVP? | ✅ €25 | ✅ $49 | Must |
| Team can operate? | ✅ Low skill | ⚠️ Medium skill | Must |

**Both options meet all Must criteria.**

---

### 6.2 Final Recommendation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ⭐ RECOMMENDATION: COOLIFY (Self-Hosted on Hetzner)                       │
│                                                                              │
│   Primary Reasons:                                                           │
│   1. 7% faster time to MVP (55 vs 59 days)                                  │
│   2. 14% lower Year 1 TCO ($56K vs $66K)                                    │
│   3. Significantly lower operational overhead                               │
│   4. Existing MCP Server accelerates Claude integration                     │
│   5. Better developer experience for small team                             │
│   6. Clear migration path to Kubernetes if needed                           │
│                                                                              │
│   Risk Mitigations:                                                          │
│   • Coolify is open source (no vendor lock-in)                              │
│   • Hetzner offers same-day server provisioning                             │
│   • All code remains portable (Docker containers)                           │
│   • Can migrate to DO/K8s if scale demands                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Recommendation

### 7.1 Immediate Next Steps (Coolify Path)

| Step | Action | Timeline |
|------|--------|----------|
| 1 | Provision Hetzner CPX31 server | Day 1 |
| 2 | Install Coolify | Day 1 |
| 3 | Configure GitHub App integration | Day 2 |
| 4 | Deploy test Next.js application | Day 2 |
| 5 | Validate MCP Server connectivity | Day 3 |
| 6 | Begin agent development per WBS | Day 4+ |

### 7.2 Fallback Plan

If Coolify proves unsuitable during MVP:

1. All applications are Docker containers (portable)
2. Configuration is in YAML files (transferable)
3. Migration to DO Droplets takes ~1 week
4. No code changes required to applications
5. Only deployment scripts need rewriting

---

## 8. Appendix: Document References

| Document | Coolify | DO Direct |
|----------|---------|-----------|
| PRD | [Coolify-PRD-v1.0](./PF-CORE-Coolify-Agent-PRD-v1.0.md) | [DO-PRD-v1.0](./PF-CORE-CICD-Agent-PRD-v1.0.md) |
| Architecture | [Coolify-ARCH-v1.0](./PF-CORE-Coolify-Agent-ARCH-v1.0.md) | [DO-ARCH-v1.0](./PF-CORE-CICD-Agent-ARCH-v1.0.md) |
| PBS | [Coolify-PBS-v1.0](./PF-CORE-Coolify-Agent-PBS-v1.0.md) | [DO-PBS-v1.0](./PF-CORE-CICD-Agent-PBS-v1.0.md) |
| WBS | [Coolify-WBS-v1.0](./PF-CORE-Coolify-Agent-WBS-v1.0.md) | [DO-WBS-v1.0](./PF-CORE-CICD-Agent-WBS-v1.0.md) |

---

**Document Classification:** CONFIDENTIAL - Platform Foundation Core Holdings

**Decision Status:** RECOMMENDED - Awaiting Stakeholder Approval

**— END OF DECISION ANALYSIS —**
