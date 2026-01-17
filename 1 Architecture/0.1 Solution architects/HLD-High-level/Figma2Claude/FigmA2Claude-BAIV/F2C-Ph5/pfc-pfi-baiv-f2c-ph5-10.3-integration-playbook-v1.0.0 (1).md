# Integration Playbook: Team Setup & CI/CD
**Version:** 1.0.0 | **Phase:** 5 | **Document:** 10.3 | **Date:** January 2026

## Team Integration

### Week 1: Foundation
**Day 1-2: Setup**
- Install Figma BAIV library
- Clone starter repository
- Configure environments
- Team accounts setup

**Day 3-4: Training**
- Designer training (2 hours)
- Developer training (4 hours)
- Team workshop (1 day)

**Day 5: Validation**
- Generate 1 test component
- Verify full pipeline
- Document issues

### Week 2: Pilot Project
**Day 6-12: Build**
- Select 2-3 page pilot
- Design in Figma
- Generate with BAIV
- Deploy to preview

### Week 3: CI/CD Setup
**GitHub Actions Workflow**
```yaml
name: BAIV Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: vercel deploy
```

**Vercel Configuration**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic-key",
    "SUPABASE_URL": "@supabase-url"
  }
}
```

### Week 4: Scale
- Deploy to production
- Measure metrics
- Plan next projects

## Collaboration Workflow

### Designer → Developer Handoff
1. Designer posts in Slack:
   ```
   🎨 Ready for Dev
   Page: Homepage Hero
   Figma: [URL]
   Components: 3 new
   ```

2. Developer extracts and generates
3. Developer shares preview URL
4. Designer reviews and approves

### Code Review Process
```
1. Create feature branch
2. Generate code
3. Create PR
4. Automated checks run
5. Designer reviews preview
6. Developer reviews code
7. Merge to main
8. Auto-deploy to production
```

## Success Metrics

### Month 1
- [ ] 5+ components generated
- [ ] 70% time reduction
- [ ] Team trained

### Quarter 1
- [ ] 50+ components
- [ ] 2+ apps deployed
- [ ] 80% consistency

### Year 1
- [ ] 100+ components
- [ ] 10+ apps
- [ ] $400k+ savings

*End of Integration Playbook*
