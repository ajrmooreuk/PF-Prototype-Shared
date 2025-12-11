# Value Proposition Wizard - Project Seeding Checklist

**Version:** 1.0.0  
**Date:** November 13, 2025

Use this checklist when seeding the Value Proposition Wizard into a new project.

---

## ✅ Pre-Seeding (5 minutes)

- [ ] **Verify package completeness**
  ```bash
  ls -la /docs/value-prop-wizard-module/
  # Should see: README.md, INTEGRATION_GUIDE.md, types/, utils/, examples/
  ```

- [ ] **Verify target project is ready**
  - [ ] React project initialized
  - [ ] TypeScript configured
  - [ ] Tailwind CSS installed
  - [ ] Shadcn/UI initialized (or ready to install)

- [ ] **Read package summary**
  - [ ] Open `/docs/VALUE_PROP_WIZARD_PACKAGE_SUMMARY.md`
  - [ ] Understand what you're getting
  - [ ] Review use cases (is this a fit?)

---

## 📦 Seeding Files (10 minutes)

### Step 1: Copy Module Files

```bash
# Navigate to target project
cd /path/to/your-project

# Create modules directory (if doesn't exist)
mkdir -p src/modules

# Copy the module
cp -r /docs/value-prop-wizard-module src/modules/

# Verify
ls -la src/modules/value-prop-wizard-module/
```

**Expected structure:**
```
your-project/
├── src/
│   ├── modules/
│   │   └── value-prop-wizard-module/  ← NEW
│   │       ├── README.md
│   │       ├── INTEGRATION_GUIDE.md
│   │       ├── types/
│   │       ├── utils/
│   │       └── examples/
│   └── ... (your existing files)
```

- [ ] Files copied successfully
- [ ] No errors during copy

---

### Step 2: Copy Documentation (Optional but Recommended)

```bash
# Copy main spec to project docs
mkdir -p docs/modules
cp /docs/VALUE_PROPOSITION_WIZARD_MODULE_SPEC.md docs/modules/
cp /docs/VALUE_PROP_WIZARD_PACKAGE_SUMMARY.md docs/modules/
```

- [ ] Documentation copied (optional)

---

## 🔧 Installation (15 minutes)

### Step 3: Install NPM Dependencies

```bash
# Required packages
npm install lucide-react sonner

# Verify installation
npm list lucide-react sonner
```

- [ ] `lucide-react` installed
- [ ] `sonner` installed
- [ ] No installation errors

---

### Step 4: Install Shadcn/UI Components

```bash
# If not initialized yet:
npx shadcn-ui@latest init
# Answer prompts (use defaults or customize)

# Install required components:
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add select
npx shadcn-ui@latest add label
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add progress
```

- [ ] Shadcn/UI initialized
- [ ] All 12 components installed
- [ ] Components in `src/components/ui/`

---

## ⚙️ Configuration (10 minutes)

### Step 5: Configure Tailwind

Edit `tailwind.config.js` (or `.ts`):

```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/modules/value-prop-wizard-module/**/*.{js,jsx,ts,tsx}', // ⭐ ADD THIS
  ],
  theme: {
    extend: {
      // Your custom theme...
    }
  },
  plugins: []
}
```

- [ ] Module path added to `content` array
- [ ] Tailwind config saved

---

### Step 6: Add Toast Provider

Edit your main `App.tsx` or `main.tsx`:

```tsx
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      {/* Your existing app content */}
      <YourRoutes />
      
      {/* ⭐ ADD THIS */}
      <Toaster position="top-right" />
    </>
  );
}
```

- [ ] Toaster component added
- [ ] Import statement added

---

## 🧪 Testing (15 minutes)

### Step 7: Create Test Page

Create `src/pages/ValuePropTest.tsx`:

```tsx
import { ValuePropositionManager } from '../modules/value-prop-wizard-module/components/ValuePropositionManager';
import { toast } from 'sonner';

export default function ValuePropTest() {
  const handleSave = (data) => {
    console.log('Saved:', data);
    toast.success('Value propositions saved!');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Value Proposition Wizard Test
      </h1>
      
      <ValuePropositionManager
        organizationId="test-org-1"
        organizationName="Test Organization"
        onSave={handleSave}
      />
    </div>
  );
}
```

- [ ] Test page created
- [ ] No TypeScript errors

---

### Step 8: Add Test Route

Add route to your router:

```tsx
// Example with React Router
import ValuePropTest from './pages/ValuePropTest';

<Route path="/test/value-prop" element={<ValuePropTest />} />
```

- [ ] Route added
- [ ] No errors

---

### Step 9: Run Development Server

```bash
npm run dev
# or
npm start
```

- [ ] Server started without errors
- [ ] No console errors

---

### Step 10: Verify in Browser

Navigate to `http://localhost:3000/test/value-prop` (or your test route)

**Checklist:**
- [ ] Wizard renders without errors
- [ ] Can see Step 1: Customer Segments
- [ ] Can click "Add Customer Segment" button
- [ ] Modal opens
- [ ] Can navigate to Step 2 (click Next)
- [ ] Progress indicator updates
- [ ] Can navigate back to Step 1
- [ ] Toast notification appears when testing actions
- [ ] No console errors in browser DevTools
- [ ] Responsive design works (resize browser)

---

## 🎨 Customization (Optional - 20 minutes)

### Step 11: Apply Your Brand Theme

```tsx
<ValuePropositionManager
  organizationId="org-123"
  theme={{
    primaryColor: '#your-primary-color',
    secondaryColor: '#your-secondary-color',
    accentColor: '#your-accent-color'
  }}
/>
```

- [ ] Brand colors applied
- [ ] Colors look good in UI

---

### Step 12: Customize Labels (if needed)

```tsx
<ValuePropositionManager
  organizationId="org-123"
  labels={{
    segments: 'Your Custom Label',
    valueProps: 'Your Custom Label',
    benefits: 'Your Custom Label'
  }}
/>
```

- [ ] Labels customized (if applicable)

---

## 🔌 Integration (Optional - 30-60 minutes)

### Step 13: Database Integration (Choose One)

**Option A: Supabase**
- [ ] Create `value_propositions` table
- [ ] Create `useValuePropositions` hook
- [ ] Test save/load operations
- [ ] Connect to wizard

**Option B: REST API**
- [ ] Create API endpoints
- [ ] Create API client functions
- [ ] Test endpoints
- [ ] Connect to wizard

**Option C: Local Storage**
- [ ] Create localStorage utils
- [ ] Test save/load
- [ ] Connect to wizard

**Option D: Skip for now (in-memory only)**
- [ ] Use wizard as-is (data lost on refresh)

---

### Step 14: AI Integration (Optional)

- [ ] Create `/api/ai/help` endpoint
- [ ] Test AI endpoint
- [ ] Enable `aiEnabled={true}` in wizard
- [ ] Test AI help panel in UI

---

## 📝 Documentation (10 minutes)

### Step 15: Update Project README

Add to your project's README:

```markdown
## Value Proposition Wizard

This project includes the Value Proposition Wizard module.

**Location:** `src/modules/value-prop-wizard-module/`

**Documentation:**
- Quick Start: `src/modules/value-prop-wizard-module/README.md`
- Integration Guide: `src/modules/value-prop-wizard-module/INTEGRATION_GUIDE.md`
- Full Spec: `docs/modules/VALUE_PROPOSITION_WIZARD_MODULE_SPEC.md`

**Usage:**
See `src/pages/ValuePropTest.tsx` for example implementation.
```

- [ ] README updated

---

### Step 16: Document Your Integration

Create `docs/VALUE_PROP_INTEGRATION.md`:

```markdown
# Value Proposition Wizard Integration

## Our Configuration

**Database:** [Supabase/REST API/LocalStorage/In-Memory]
**AI Enabled:** [Yes/No]
**Custom Theme:** [Yes/No]
**Custom Labels:** [Yes/No]

## Pages Using Wizard

- `/organizations/:id/value-props` - Main wizard
- `/test/value-prop` - Test page

## API Endpoints (if applicable)

- `POST /api/value-propositions` - Save
- `GET /api/value-propositions/:orgId` - Load

## Notes

[Any project-specific notes, customizations, or gotchas]
```

- [ ] Integration documented

---

## 🚀 Deployment Preparation (15 minutes)

### Step 17: Build & Test

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Test build output
npm run preview  # or serve build folder
```

- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Build succeeds
- [ ] Preview works

---

### Step 18: Environment Variables (if using AI/Database)

Create `.env.example`:

```bash
# Value Proposition Wizard
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=your-claude-api-key  # If using AI
```

- [ ] `.env.example` created
- [ ] All required variables documented
- [ ] `.env` in `.gitignore`

---

## ✅ Final Verification (10 minutes)

### Step 19: Complete Integration Test

**End-to-end test:**
1. [ ] Navigate to wizard page
2. [ ] Add a customer segment (Step 1)
   - [ ] Fill form
   - [ ] Save
   - [ ] See segment card
3. [ ] Navigate to Step 2
   - [ ] Add value proposition
   - [ ] Link to segment
   - [ ] Save
4. [ ] Navigate to Step 3
   - [ ] Add benefits
   - [ ] Add proof points
5. [ ] Navigate to Step 4 (Review)
   - [ ] See summary
   - [ ] Click "Save & Finalize"
   - [ ] Toast notification appears
   - [ ] Data persists (if database connected)

---

### Step 20: Clean Up Test Files (Optional)

If test page was only for verification:

```bash
# Remove test page
rm src/pages/ValuePropTest.tsx

# Remove test route
# (edit your router file)
```

- [ ] Test files removed (if desired)
- [ ] Test route removed (if desired)

---

## 📊 Seeding Complete!

### Summary

- **Files Seeded:** ✅
- **Dependencies Installed:** ✅
- **Configuration Complete:** ✅
- **Testing Verified:** ✅
- **Documentation Updated:** ✅
- **Ready for Production:** ✅

---

## 🎓 Next Steps

Now that the wizard is seeded:

1. **Customize** to your brand/use case
2. **Integrate** with your database
3. **Enable AI** (optional but recommended)
4. **Deploy** to production
5. **Train your team** on using the wizard

---

## 📞 Support

If you encounter issues:

1. **Check Integration Guide:** `src/modules/value-prop-wizard-module/INTEGRATION_GUIDE.md`
2. **Review Examples:** `src/modules/value-prop-wizard-module/examples/BasicExample.tsx`
3. **Read Troubleshooting:** Integration Guide → Troubleshooting section
4. **Contact:** support@baiv.io

---

## 📝 Seeding Log

**Project:** [Your Project Name]  
**Seeded By:** [Your Name]  
**Date:** [Date]  
**Version:** 1.0.0  
**Notes:** [Any additional notes]

---

**Checklist Complete!** 🎉

Your project now has a production-ready Value Proposition Wizard.
