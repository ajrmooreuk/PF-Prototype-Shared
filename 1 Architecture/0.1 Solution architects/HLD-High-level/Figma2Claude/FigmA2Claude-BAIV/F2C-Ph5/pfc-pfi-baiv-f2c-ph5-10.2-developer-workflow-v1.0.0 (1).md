# Developer Workflow: Code Generation to Production
**Version:** 1.0.0 | **Phase:** 5 | **Document:** 10.2 | **Date:** January 2026

## Overview
Complete developer workflow from Figma to production. **Time: 45-60 minutes per page**.

## Workflow Steps

### 1. Setup (5 min)
```bash
npx create-next-app@latest --typescript --tailwind
npm install @baiv/design-system @anthropic/mcp-figma
```

### 2. Extract (5 min)
```bash
npx @anthropic/mcp-figma extract --file-url "URL" --output "./design.json"
```

### 3. Generate (15 min)
Upload design.json to claude.ai:
"Generate Next.js page using BAIV tokens"

### 4. Integrate (10 min)
Add code to project, create components

### 5. Test (10 min)
```bash
npm run dev
npm run lint
npm test
```

### 6. Deploy (10 min)
```bash
vercel deploy
```

## Quality Checklist
- [ ] TypeScript compiles
- [ ] BAIV tokens used
- [ ] Responsive design
- [ ] Lighthouse 90+
- [ ] Accessibility passes

*End*
