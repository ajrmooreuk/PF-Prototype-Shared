# BAIV Brand Style Editor
## Installation & User Guide v2.3.0

---

## Quick Start

### 1. Installation (5 minutes)

#### **Option A: Standalone Local Use**
```bash
# 1. Create folder
mkdir baiv-brand-editor
cd baiv-brand-editor

# 2. Save the HTML file as index.html
# 3. Open directly in browser (double-click)
# OR run a local server:
python3 -m http.server 8000
# Navigate to: http://localhost:8000
```

#### **Option B: Web Server Deployment**
```
/var/www/your-site/
├── brand-editor/
│   ├── index.html         # The editor app
│   ├── images/            # Logo files
│   └── exports/           # JSON exports
```

#### **Option C: WordPress Integration**
```php
// Add to theme or plugin
function baiv_brand_editor_page() {
    include('brand-editor/index.html');
}
add_shortcode('baiv_brand_editor', 'baiv_brand_editor_page');
// Use: [baiv_brand_editor] in any page
```

---

## 2. Configuration

### Initial Setup

1. **Open the editor** in your browser
2. **Default brands loaded**:
   - BAIV (master-001) - Main brand
   - Wings for Mind (partner-002) - Partner example
   - Think Tank (partner-003) - Partner example  
   - Custom Client (client-004) - White label template

### File Structure Required
```
brand-editor/
├── index.html              # Main editor (required)
├── baiv-config.json        # Exported configurations
└── images/                 # Optional: local logos
    ├── baiv-logo.svg
    └── partner-logos/
```

---

## 3. User Guide

### Basic Operations

#### **Switching Brands**
1. Click any brand button in "Brand Registry" panel
2. Colors, fonts, and logos update instantly
3. Active brand shows blue gradient background

#### **Editing Colors**
1. Click **"Edit"** button in Color Values panel
2. Click any color swatch to open color picker
3. Select new color
4. Click **"Done"** when finished
5. Changes save automatically to the brand

#### **Editing Typography**
1. Click **"Edit"** button in Typography panel
2. Select new fonts from dropdowns:
   - **Heading**: Titillium Web, Inter, Roboto, Open Sans, System UI
   - **Body**: Inter, Roboto, Open Sans, Titillium Web, System UI
   - **Monospace**: Monaco, Courier New, SF Mono, System Mono
3. Preview shows live font changes
4. Click **"Done"** to finish

#### **Adding New Brand**
1. In Brand Registry, scroll to "Add New Brand"
2. Enter:
   - **Brand Name**: Display name
   - **Website URL**: Brand's website
   - **Organization ID**: Unique identifier (e.g., client-005)
3. Click **"Add Brand"**
4. New brand appears in list with default black/white colors
5. Switch to new brand and customize colors/fonts

### Advanced Features

#### **Co-Branding Test**
Test how two brands blend:
1. Click **"BAIV + Wings for Mind"** or **"BAIV + Think Tank"**
2. Colors blend 60/40 ratio
3. Primary brand dominates, secondary provides accents

#### **Export Configuration**
1. Click **"Export to Ontology"** button (bottom right)
2. Downloads JSON file with all brand configurations
3. File includes:
   - All brand settings
   - Organization IDs and relationships
   - Colors, fonts, and logo paths
   - Timestamps for version tracking

---

## 4. JSON Ontology Integration

### Using Exported Configuration

#### **In WordPress**
```php
// Load configuration
$config = json_decode(file_get_contents('baiv-config.json'), true);
$brand = $config['brands']['master-001'];

// Apply to theme
add_action('wp_head', function() use ($brand) {
    echo '<style>:root {';
    foreach ($brand['configuredColors'] as $key => $value) {
        echo "--$key: $value;";
    }
    echo '}</style>';
});
```

#### **In React/Next.js**
```javascript
import brandConfig from './baiv-config.json';

function applyBrand(orgId) {
    const brand = brandConfig.brands[orgId];
    Object.entries(brand.configuredColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
}

// Apply BAIV brand
applyBrand('master-001');
```

#### **In Plain JavaScript**
```javascript
fetch('baiv-config.json')
    .then(res => res.json())
    .then(config => {
        const brand = config.brands['master-001'];
        // Apply styles
        for (const [key, value] of Object.entries(brand.configuredColors)) {
            document.documentElement.style.setProperty(`--${key}`, value);
        }
    });
```

---

## 5. Organization ID Structure

### Master Organization Hierarchy
```
master-001 (BAIV)
├── partner-002 (Wings for Mind) - Co-brand relationship
├── partner-003 (Think Tank) - Co-brand relationship
└── client-004+ (White Label) - Custom implementations
```

### Relationship Types
- **own**: Full BAIV brand identity
- **co-branded**: Shared brand elements (60/40 split)
- **white-label**: Client brand only
- **custom**: User-added brands

---

## 6. Tips & Best Practices

### Color Management
1. **Use color picker extensions** (ColorZilla, Eye Dropper) to grab exact colors from websites
2. **Browser DevTools** (F12) → Inspect element → See computed styles
3. **Maintain contrast** - Ensure text remains readable

### Font Selection
- **Headings**: Choose distinctive fonts (Titillium Web for tech feel)
- **Body**: Prioritize readability (Inter is excellent for screens)
- **Consistency**: Don't mix more than 2 font families

### Brand Organization
- Use consistent **Organization ID** format: `type-number` (e.g., partner-005)
- Keep **Website URLs** updated for reference
- Export configurations regularly for backup

### Performance
- Editor works **offline** after first load
- All changes are **client-side** (no server required)
- Exports are **local downloads** (no cloud storage)

---

## 7. Troubleshooting

| Issue | Solution |
|-------|----------|
| Colors not updating | Ensure "Edit" mode is active (button shows "Done") |
| Fonts not changing | Check font is loaded in browser (may need internet for Google Fonts) |
| Export not working | Check browser allows downloads, try different browser |
| New brand not appearing | Ensure all three fields filled (Name, URL, Org ID) |
| Logo not displaying | Use base64 encoded images or host locally |

---

## 8. File Outputs

### Exported JSON Structure
```json
{
  "version": "2.3.0",
  "timestamp": "2025-01-17T10:00:00Z",
  "brands": {
    "master-001": {
      "orgId": "master-001",
      "name": "BAIV",
      "type": "own",
      "websiteUrl": "https://baiv.ai",
      "configuredColors": {
        "primary": "#00a4bf",
        "accent": "#cec528"
        // ... all colors
      },
      "fonts": {
        "heading": "'Titillium Web', sans-serif",
        "body": "'Inter', sans-serif"
      },
      "relationships": {
        "master": "master-001",
        "bridges": []
      }
    }
  }
}
```

---

## 9. Browser Requirements

- **Minimum**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Features Used**: CSS Custom Properties, ES6 JavaScript, Blob API
- **External Dependencies**: Google Fonts CDN (optional, fallback to system fonts)

---

## 10. Security Notes

- All processing is **client-side** (no data sent to servers)
- No cookies or tracking
- No user data stored (except browser localStorage if implemented)
- Safe for sensitive brand configurations

---

## Support & Updates

- **Current Version**: 2.3.0
- **Style Guide**: BAIV App Style Guide v2.3.0
- **JSON Schema**: v2.3.0
- **Last Updated**: January 17, 2025

For implementation support or custom development needs, refer to the BAIV App Style Guide documentation.

---

*End of User Guide*