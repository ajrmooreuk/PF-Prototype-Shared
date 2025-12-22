# Figma Token Library Setup Checklist

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Project:** BAIV Design System

---

## Pre-Setup Requirements

- [ ] Figma Team or Organization workspace (not personal drafts)
- [ ] Admin or Editor permissions in the Team
- [ ] Token naming convention agreed upon
- [ ] Brand/mode requirements defined
- [ ] Target platforms identified (Web, iOS, Android)

---

## Phase 1: File Creation

### 1.1 Create Library File
- [ ] Create new Figma file
- [ ] Name file: `[Brand] Design Tokens Library`
- [ ] Save in Team project location
- [ ] Add file description explaining purpose

### 1.2 Document Setup
- [ ] Create cover page with library info
- [ ] Add version number to cover
- [ ] Include usage instructions
- [ ] Add changelog section

---

## Phase 2: Variable Collections Setup

### 2.1 Create Collections
| Collection | Created | Modes Added | Scoping Set |
|------------|---------|-------------|-------------|
| Colors | ☐ | ☐ | ☐ |
| Typography | ☐ | ☐ | ☐ |
| Spacing | ☐ | ☐ | ☐ |
| Sizing | ☐ | ☐ | ☐ |
| Border Radius | ☐ | ☐ | ☐ |
| Effects/Shadows | ☐ | ☐ | ☐ |

### 2.2 Configure Modes
- [ ] Rename "Mode 1" to primary mode name (e.g., "Light")
- [ ] Add Dark mode
- [ ] Add brand variants if multi-tenant
- [ ] Set default mode for each collection

**Mode Configuration:**
```
Collection: Colors
├── Mode: Light (default)
├── Mode: Dark
├── Mode: High Contrast (optional)

Collection: Typography
├── Mode: Default
├── Mode: Compact (optional)
├── Mode: Large (optional)
```

---

## Phase 3: Primitive Tokens

### 3.1 Color Primitives
Create base color scales (50-950):

| Color | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|-------|----|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| Gray | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Blue | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Green | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Red | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Yellow | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Orange | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Purple | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

### 3.2 Spacing Primitives
| Token Name | Value | Created |
|------------|-------|---------|
| spacing/0 | 0 | ☐ |
| spacing/px | 1 | ☐ |
| spacing/0.5 | 2 | ☐ |
| spacing/1 | 4 | ☐ |
| spacing/1.5 | 6 | ☐ |
| spacing/2 | 8 | ☐ |
| spacing/2.5 | 10 | ☐ |
| spacing/3 | 12 | ☐ |
| spacing/3.5 | 14 | ☐ |
| spacing/4 | 16 | ☐ |
| spacing/5 | 20 | ☐ |
| spacing/6 | 24 | ☐ |
| spacing/7 | 28 | ☐ |
| spacing/8 | 32 | ☐ |
| spacing/9 | 36 | ☐ |
| spacing/10 | 40 | ☐ |
| spacing/12 | 48 | ☐ |
| spacing/14 | 56 | ☐ |
| spacing/16 | 64 | ☐ |
| spacing/20 | 80 | ☐ |
| spacing/24 | 96 | ☐ |

### 3.3 Typography Primitives
| Token Name | Value | Created |
|------------|-------|---------|
| font/family/sans | Inter | ☐ |
| font/family/serif | Georgia | ☐ |
| font/family/mono | JetBrains Mono | ☐ |
| font/size/xs | 12 | ☐ |
| font/size/sm | 14 | ☐ |
| font/size/base | 16 | ☐ |
| font/size/lg | 18 | ☐ |
| font/size/xl | 20 | ☐ |
| font/size/2xl | 24 | ☐ |
| font/size/3xl | 30 | ☐ |
| font/size/4xl | 36 | ☐ |
| font/size/5xl | 48 | ☐ |
| font/weight/regular | 400 | ☐ |
| font/weight/medium | 500 | ☐ |
| font/weight/semibold | 600 | ☐ |
| font/weight/bold | 700 | ☐ |
| line-height/none | 1 | ☐ |
| line-height/tight | 1.25 | ☐ |
| line-height/snug | 1.375 | ☐ |
| line-height/normal | 1.5 | ☐ |
| line-height/relaxed | 1.625 | ☐ |
| line-height/loose | 2 | ☐ |

### 3.4 Border Radius Primitives
| Token Name | Value | Created |
|------------|-------|---------|
| radius/none | 0 | ☐ |
| radius/sm | 4 | ☐ |
| radius/md | 6 | ☐ |
| radius/lg | 8 | ☐ |
| radius/xl | 12 | ☐ |
| radius/2xl | 16 | ☐ |
| radius/3xl | 24 | ☐ |
| radius/full | 9999 | ☐ |

---

## Phase 4: Semantic Tokens

### 4.1 Background Colors
| Token Name | Light Mode Alias | Dark Mode Alias | Created |
|------------|------------------|-----------------|---------|
| bg/default | primitive/white | primitive/gray/950 | ☐ |
| bg/subtle | primitive/gray/50 | primitive/gray/900 | ☐ |
| bg/muted | primitive/gray/100 | primitive/gray/800 | ☐ |
| bg/emphasis | primitive/gray/200 | primitive/gray/700 | ☐ |
| bg/inverse | primitive/gray/900 | primitive/gray/50 | ☐ |

### 4.2 Foreground Colors
| Token Name | Light Mode Alias | Dark Mode Alias | Created |
|------------|------------------|-----------------|---------|
| fg/default | primitive/gray/900 | primitive/gray/50 | ☐ |
| fg/muted | primitive/gray/600 | primitive/gray/400 | ☐ |
| fg/subtle | primitive/gray/500 | primitive/gray/500 | ☐ |
| fg/inverse | primitive/white | primitive/gray/900 | ☐ |
| fg/disabled | primitive/gray/400 | primitive/gray/600 | ☐ |

### 4.3 Border Colors
| Token Name | Light Mode Alias | Dark Mode Alias | Created |
|------------|------------------|-----------------|---------|
| border/default | primitive/gray/200 | primitive/gray/700 | ☐ |
| border/muted | primitive/gray/100 | primitive/gray/800 | ☐ |
| border/emphasis | primitive/gray/300 | primitive/gray/600 | ☐ |
| border/focus | primitive/blue/500 | primitive/blue/400 | ☐ |

### 4.4 Interactive Colors
| Token Name | Light Mode Alias | Dark Mode Alias | Created |
|------------|------------------|-----------------|---------|
| primary/default | primitive/blue/600 | primitive/blue/500 | ☐ |
| primary/hover | primitive/blue/700 | primitive/blue/400 | ☐ |
| primary/active | primitive/blue/800 | primitive/blue/300 | ☐ |
| primary/subtle | primitive/blue/50 | primitive/blue/950 | ☐ |
| destructive/default | primitive/red/600 | primitive/red/500 | ☐ |
| destructive/hover | primitive/red/700 | primitive/red/400 | ☐ |
| success/default | primitive/green/600 | primitive/green/500 | ☐ |
| warning/default | primitive/yellow/500 | primitive/yellow/400 | ☐ |

### 4.5 Semantic Spacing
| Token Name | Alias To | Created |
|------------|----------|---------|
| space/page/x | spacing/6 | ☐ |
| space/page/y | spacing/8 | ☐ |
| space/section | spacing/16 | ☐ |
| space/card/padding | spacing/4 | ☐ |
| space/card/gap | spacing/3 | ☐ |
| space/input/x | spacing/3 | ☐ |
| space/input/y | spacing/2 | ☐ |
| space/button/x | spacing/4 | ☐ |
| space/button/y | spacing/2 | ☐ |

### 4.6 Semantic Sizing
| Token Name | Value | Created |
|------------|-------|---------|
| size/icon/xs | 12 | ☐ |
| size/icon/sm | 16 | ☐ |
| size/icon/md | 20 | ☐ |
| size/icon/lg | 24 | ☐ |
| size/icon/xl | 32 | ☐ |
| size/avatar/xs | 24 | ☐ |
| size/avatar/sm | 32 | ☐ |
| size/avatar/md | 40 | ☐ |
| size/avatar/lg | 48 | ☐ |
| size/avatar/xl | 64 | ☐ |

---

## Phase 5: Component Tokens

### 5.1 Button Tokens
| Token Name | Alias/Value | Created |
|------------|-------------|---------|
| button/primary/bg | primary/default | ☐ |
| button/primary/bg-hover | primary/hover | ☐ |
| button/primary/text | fg/inverse | ☐ |
| button/secondary/bg | bg/subtle | ☐ |
| button/secondary/text | fg/default | ☐ |
| button/secondary/border | border/default | ☐ |
| button/ghost/bg | transparent | ☐ |
| button/ghost/text | fg/default | ☐ |
| button/destructive/bg | destructive/default | ☐ |
| button/destructive/text | fg/inverse | ☐ |
| button/radius | radius/md | ☐ |
| button/padding-x | space/button/x | ☐ |
| button/padding-y | space/button/y | ☐ |

### 5.2 Input Tokens
| Token Name | Alias/Value | Created |
|------------|-------------|---------|
| input/bg | bg/default | ☐ |
| input/border | border/default | ☐ |
| input/border-focus | border/focus | ☐ |
| input/text | fg/default | ☐ |
| input/placeholder | fg/subtle | ☐ |
| input/radius | radius/md | ☐ |
| input/padding-x | space/input/x | ☐ |
| input/padding-y | space/input/y | ☐ |

### 5.3 Card Tokens
| Token Name | Alias/Value | Created |
|------------|-------------|---------|
| card/bg | bg/default | ☐ |
| card/border | border/muted | ☐ |
| card/radius | radius/lg | ☐ |
| card/padding | space/card/padding | ☐ |
| card/shadow | shadow/md | ☐ |

---

## Phase 6: Variable Configuration

### 6.1 Scoping Configuration
| Collection | Scopes to Enable |
|------------|------------------|
| Colors | All fills, Stroke, Effects |
| Typography | Font family, Font size, Font weight, Line height, Letter spacing |
| Spacing | Gap, Padding |
| Sizing | Width and height |
| Border Radius | Corner radius |

- [ ] Scoping configured for all variables

### 6.2 Code Syntax Setup
For each variable, add code syntax for target platforms:

| Platform | Syntax Format | Example |
|----------|---------------|---------|
| Web | `var(--{path})` | `var(--color-primary-default)` |
| iOS | `Color.{camelCase}` | `Color.primaryDefault` |
| Android | `R.color.{snake_case}` | `R.color.primary_default` |

- [ ] Web code syntax added
- [ ] iOS code syntax added
- [ ] Android code syntax added

### 6.3 Descriptions
- [ ] All primitives have descriptions
- [ ] All semantic tokens have descriptions explaining usage
- [ ] Component tokens have descriptions with usage context

---

## Phase 7: Publishing

### 7.1 Pre-Publish Review
- [ ] All tokens created and verified
- [ ] All modes have correct values
- [ ] All aliases resolve correctly
- [ ] Naming conventions consistent
- [ ] No duplicate tokens
- [ ] Code syntax verified

### 7.2 Publish Library
- [ ] Go to File → Libraries
- [ ] Click "Publish..."
- [ ] Add version description (e.g., "v1.0.0 - Initial token system")
- [ ] Review changes summary
- [ ] Click "Publish"

### 7.3 Post-Publish
- [ ] Verify library appears in Team Libraries
- [ ] Test enabling in a new file
- [ ] Test applying variables from library
- [ ] Document library location for team

---

## Phase 8: Consumption Setup

### 8.1 Enable in Consumer Files
For each file that needs the library:
- [ ] Open Assets panel
- [ ] Click Team library icon
- [ ] Toggle ON the token library
- [ ] Verify variables accessible

### 8.2 Team Communication
- [ ] Announce library availability
- [ ] Share usage documentation
- [ ] Provide migration guide for existing files
- [ ] Schedule training session

---

## Maintenance Checklist

### Regular Updates
- [ ] Review and update tokens quarterly
- [ ] Add new tokens as needed
- [ ] Deprecate unused tokens
- [ ] Update version number with each publish

### Version Control
| Version | Date | Changes | Published By |
|---------|------|---------|--------------|
| 1.0.0 | | Initial release | |
| | | | |
| | | | |

### Update Process
1. Make changes in library file
2. Test changes locally
3. Publish with descriptive version notes
4. Notify team of updates
5. Consumer files will show update notification

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Library not appearing | Check file is in Team project |
| Variables not accessible | Ensure library is enabled in consumer file |
| Updates not propagating | Republish library; check for errors |
| Mode values incorrect | Verify aliases in each mode |
| Cannot publish | Check you have Editor permissions |

---

## Notes & Decisions

Use this section to document important decisions:

```
Date: 
Decision: 
Rationale: 
```

---

## Sign-Off

| Phase | Completed | Verified By | Date |
|-------|-----------|-------------|------|
| Phase 1: File Creation | ☐ | | |
| Phase 2: Collections | ☐ | | |
| Phase 3: Primitives | ☐ | | |
| Phase 4: Semantic | ☐ | | |
| Phase 5: Component | ☐ | | |
| Phase 6: Configuration | ☐ | | |
| Phase 7: Publishing | ☐ | | |
| Phase 8: Consumption | ☐ | | |

**Final Approval:**  
Name: _________________ Date: _________________
