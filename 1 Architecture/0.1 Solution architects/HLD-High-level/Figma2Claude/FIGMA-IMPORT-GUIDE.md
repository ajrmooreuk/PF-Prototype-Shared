# Figma Import Guide

## How to Import Design Tokens into Figma

**Important Context:** Figma does not have native JSON/CSV import for Variables without using a plugin or the REST API. This guide covers all available options.

---

## Table of Contents

1. [Option 1: Free Plugin Import (Recommended)](#option-1-free-plugin-import-recommended)
2. [Option 2: Figma REST API (Programmatic)](#option-2-figma-rest-api-programmatic)
3. [Option 3: Manual Variable Creation](#option-3-manual-variable-creation)
4. [Option 4: Tokens Studio Plugin (Advanced)](#option-4-tokens-studio-plugin-advanced)
5. [After Import: Using Your Variables](#after-import-using-your-variables)

---

## Option 1: Free Plugin Import (Recommended)

### Using "Design Tokens to Variables" Plugin

This is the easiest approach for importing JSON tokens into Figma Variables.

**Plugin:** [Design Tokens to Variables](https://www.figma.com/community/plugin/1410168064290005516/design-tokens-to-variables)

### Step-by-Step Instructions

```
1. INSTALL THE PLUGIN
   ├── Go to Figma Community
   ├── Search: "Design Tokens to Variables"
   ├── Click "Try it out" or "Save"
   └── Plugin is now available in your Figma

2. OPEN YOUR FIGMA FILE
   ├── Open or create a new Figma file
   └── This will be your design system file

3. RUN THE PLUGIN
   ├── Right-click canvas → Plugins → Design Tokens to Variables
   └── Or: Menu → Plugins → Design Tokens to Variables

4. PASTE YOUR TOKENS
   ├── Open tokens.json from this package
   ├── Copy the entire contents
   ├── Paste into the plugin input area
   └── Click "Convert"

5. VERIFY IMPORT
   ├── Open Variables panel (click variables icon)
   ├── You should see new collections:
   │   ├── Colors (with NovaTech + BAIV modes)
   │   ├── Spacing
   │   ├── Border Radius
   │   └── Typography
   └── Test by applying a variable to a shape
```

### What Gets Imported

| Collection | Variables | Modes |
|------------|-----------|-------|
| Colors | 16 semantic colors | NovaTech, BAIV |
| Spacing | 13 spacing values | Default |
| Border Radius | 7 radius values | Default |
| Typography | 11 font/line values | Default |

---

## Option 2: Figma REST API (Programmatic)

Use the Figma Variables API to create variables programmatically. Best for automation and CI/CD pipelines.

### Prerequisites

- Figma access token (from account settings)
- File key (from Figma URL)
- Node.js or Python for scripting

### API Script Example (Node.js)

```javascript
// figma-import.js
const FIGMA_TOKEN = 'your-figma-access-token';
const FILE_KEY = 'your-file-key';

const figmaVariables = require('./figma-variables.json');

async function importVariables() {
  // Step 1: Create variable collections
  for (const collection of figmaVariables.variableCollections) {
    
    // Create collection
    const collectionResponse = await fetch(
      `https://api.figma.com/v1/files/${FILE_KEY}/variables`,
      {
        method: 'POST',
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variableCollections: [{
            action: 'CREATE',
            name: collection.name,
            modes: collection.modes.map((mode, index) => ({
              action: 'CREATE',
              name: mode.name,
              // First mode is always default
            })),
          }],
        }),
      }
    );
    
    const result = await collectionResponse.json();
    const collectionId = result.meta.variableCollections[0].id;
    const modeIds = result.meta.variableCollections[0].modes;
    
    // Step 2: Create variables in collection
    for (const variable of collection.variables) {
      const variableBody = {
        variables: [{
          action: 'CREATE',
          name: variable.name,
          variableCollectionId: collectionId,
          resolvedType: variable.type,
          // Set values per mode
          valuesByMode: {},
        }],
      };
      
      // Map values to mode IDs
      collection.modes.forEach((mode, index) => {
        const modeId = modeIds[index].modeId;
        variableBody.variables[0].valuesByMode[modeId] = 
          parseValue(variable.values[mode.name], variable.type);
      });
      
      await fetch(
        `https://api.figma.com/v1/files/${FILE_KEY}/variables`,
        {
          method: 'POST',
          headers: {
            'X-Figma-Token': FIGMA_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(variableBody),
        }
      );
    }
    
    console.log(`✓ Created collection: ${collection.name}`);
  }
}

function parseValue(value, type) {
  if (type === 'COLOR') {
    // Convert hex to Figma RGBA format
    const hex = value.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16) / 255,
      g: parseInt(hex.substring(2, 4), 16) / 255,
      b: parseInt(hex.substring(4, 6), 16) / 255,
      a: 1,
    };
  }
  return value;
}

importVariables().then(() => console.log('Import complete!'));
```

### Running the Script

```bash
# Install dependencies
npm init -y

# Set your credentials
export FIGMA_TOKEN="your-token"

# Run import
node figma-import.js
```

---

## Option 3: Manual Variable Creation

If you prefer not to use plugins, you can create variables manually in Figma.

### Step-by-Step Manual Creation

```
1. OPEN VARIABLES PANEL
   ├── Click the Variables icon in right sidebar
   └── Or: Menu → Variables → Local variables

2. CREATE COLOR COLLECTION
   ├── Click "Create collection"
   ├── Name it "Colors"
   ├── Add a mode: Click "+" next to "Mode 1"
   ├── Rename modes: "NovaTech" and "BAIV"
   └── Create variables:

   Variable Name          NovaTech   BAIV
   ─────────────────────────────────────────
   primary/default        #3B82F6    #00a4bf
   primary/light          #60A5FA    #00a4bf
   primary/dark           #2563EB    #005260
   secondary/default      #8B5CF6    #e84e1c
   accent/default         #EC4899    #cec528
   neutral/default        #64748B    #cce8ee
   success/default        #10B981    #019587
   warning/default        #F59E0B    #cf057d
   error/default          #EF4444    #cec528
   info/default           #3B82F6    #1c3e8e
   background             #FFFFFF    #FFFFFF
   foreground             #0f172a    #1a1a2e
   surface                #f8fafc    #f0f9fa
   border                 #e2e8f0    #d1e7ea
   muted/default          #f1f5f9    #e6f4f6
   muted/foreground       #64748b    #4a5568

3. CREATE SPACING COLLECTION
   ├── Click "Create collection"
   ├── Name it "Spacing"
   └── Create number variables:

   Variable Name    Value
   ─────────────────────
   spacing/1        4
   spacing/2        8
   spacing/3        12
   spacing/4        16
   spacing/5        20
   spacing/6        24
   spacing/8        32
   spacing/10       40
   spacing/12       48
   spacing/16       64
   spacing/20       80
   spacing/24       96

4. CREATE BORDER RADIUS COLLECTION
   ├── Click "Create collection"
   ├── Name it "Border Radius"
   └── Create number variables:

   Variable Name    Value
   ─────────────────────
   radius/none      0
   radius/sm        4
   radius/md        8
   radius/lg        12
   radius/xl        16
   radius/2xl       24
   radius/full      9999

5. PUBLISH AS LIBRARY (Optional)
   ├── File → Libraries → Publish
   ├── Add release notes
   └── Your variables are now team-wide
```

### Time Estimate

| Collection | Variables | Est. Time |
|------------|-----------|-----------|
| Colors | 16 × 2 modes = 32 entries | 15-20 min |
| Spacing | 12 variables | 5-10 min |
| Border Radius | 7 variables | 3-5 min |
| Typography | 11 variables | 5-8 min |
| **Total** | | **30-45 min** |

---

## Option 4: Tokens Studio Plugin (Advanced)

For teams already using Tokens Studio, this provides the most powerful token management.

### Features

- Sync tokens with GitHub/GitLab
- Support for all token types
- Theme management
- Token aliasing (references)

### Installation

1. Install from Figma Community: "Tokens Studio for Figma"
2. Create a free account at tokens.studio
3. Import `tokens.json` using W3C format option

### Syncing with Code Repository

```json
// .tokens-studio/config.json
{
  "source": ["tokens.json"],
  "parsers": [{
    "pattern": "**/tokens.json",
    "format": "dtcg"
  }],
  "transform": {
    "css": {
      "transformers": ["attribute/cti", "name/cti/kebab", "color/css"],
      "buildPath": "build/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables"
      }]
    }
  }
}
```

---

## After Import: Using Your Variables

### In Figma Designs

```
APPLYING COLOR VARIABLES
─────────────────────────
1. Select any shape or frame
2. In the Fill section, click the color swatch
3. Click the "≡" icon (libraries)
4. Select your color variable
5. The shape now uses the variable

APPLYING SPACING VARIABLES
─────────────────────────
1. Select a frame with Auto-Layout
2. Click the spacing value (gap or padding)
3. Click the "≡" icon
4. Select your spacing variable

SWITCHING MODES/THEMES
─────────────────────────
1. Select a frame
2. In Properties panel, find "Variables"
3. Click mode dropdown
4. Switch between "NovaTech" and "BAIV"
5. All children using variables update instantly
```

### In Generated Code

The CSS variables file (`globals.css`) mirrors your Figma variables:

```css
/* In your component */
.button {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

```jsx
// In React with Tailwind
<Button className="bg-primary text-primary-foreground p-4 rounded-md">
  Click me
</Button>
```

### Switching Themes at Runtime

```jsx
// ThemeProvider.tsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('novatech');
  
  return (
    <div data-theme={theme}>
      {children}
      <button onClick={() => setTheme(
        theme === 'novatech' ? 'baiv' : 'novatech'
      )}>
        Toggle Theme
      </button>
    </div>
  );
}
```

---

## Troubleshooting

### Plugin Import Fails

- Ensure JSON is valid (use jsonlint.com to verify)
- Check for trailing commas
- Some plugins require specific formats

### Colors Look Wrong

- Figma uses RGB (0-1 range) internally
- Hex colors should include # prefix
- Verify color mode (RGB vs HSL)

### Variables Not Appearing in Designs

- Ensure correct scoping is set on variables
- Check if variables are hidden from publishing
- Verify you're in the correct Figma file

### Mode Switching Doesn't Work

- Modes only work on frames, not individual shapes
- Apply mode at the frame level, children inherit
- Check that all children use variables, not raw values

---

## Quick Reference

| Format | File | Best For |
|--------|------|----------|
| W3C Design Tokens | `tokens.json` | Plugin import, Tokens Studio |
| Figma API | `figma-variables.json` | Automation, CI/CD |
| CSS Variables | `globals.css` | Web projects |
| Tailwind Config | `tailwind.config.js` | Tailwind CSS projects |

---

**Need Help?**

- Figma Variables Guide: https://help.figma.com/hc/en-us/articles/15339657135383
- W3C Design Tokens: https://design-tokens.github.io/community-group/format/
- Tokens Studio Docs: https://docs.tokens.studio/

