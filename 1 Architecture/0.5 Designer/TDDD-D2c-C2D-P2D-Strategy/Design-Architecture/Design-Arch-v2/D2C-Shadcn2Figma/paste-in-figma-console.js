/**
 * =============================================================
 * SHADCN BREADCRUMB COMPONENT GENERATOR FOR FIGMA
 * =============================================================
 * 
 * HOW TO USE:
 * 1. Open Figma Desktop
 * 2. Go to Plugins > Development > Open Console
 * 3. Paste this entire script
 * 4. Press Enter/Return
 * 
 * This will generate:
 * - Atomic components: BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
 * - Composite components: BreadcrumbItem, BreadcrumbList, Breadcrumb
 * - All styled to match shadcn/ui design tokens
 */

(async function() {
  
  // ============================================
  // SHADCN DESIGN TOKENS
  // ============================================
  const TOKENS = {
    colors: {
      foreground: { r: 0.024, g: 0.024, b: 0.027 },        // hsl(240 10% 3.9%)
      mutedForeground: { r: 0.455, g: 0.455, b: 0.478 },   // hsl(240 3.8% 46.1%)
    },
    spacing: {
      sm: 6,   // gap-1.5 = 6px
      md: 8,   // gap-2 = 8px
    },
    fontSize: 14,
    iconSize: 14,
  };

  // ============================================
  // HELPER: Create Chevron Icon
  // ============================================
  function createChevronIcon(color) {
    const vector = figma.createVector();
    vector.name = 'ChevronRight';
    vector.vectorPaths = [{
      windingRule: 'NONZERO',
      data: 'M 4 2 L 10 7 L 4 12'
    }];
    vector.resize(14, 14);
    vector.strokes = [{ type: 'SOLID', color: color }];
    vector.strokeWeight = 1.75;
    vector.strokeCap = 'ROUND';
    vector.strokeJoin = 'ROUND';
    vector.fills = [];
    return vector;
  }

  // ============================================
  // HELPER: Create Ellipsis Dots
  // ============================================
  function createEllipsisDots(color) {
    const frame = figma.createFrame();
    frame.name = 'MoreHorizontal';
    frame.resize(14, 14);
    frame.fills = [];
    frame.layoutMode = 'HORIZONTAL';
    frame.itemSpacing = 2;
    frame.primaryAxisAlignItems = 'CENTER';
    frame.counterAxisAlignItems = 'CENTER';
    frame.paddingLeft = 1;
    
    for (let i = 0; i < 3; i++) {
      const dot = figma.createEllipse();
      dot.resize(2.5, 2.5);
      dot.fills = [{ type: 'SOLID', color: color }];
      frame.appendChild(dot);
    }
    return frame;
  }

  // ============================================
  // COMPONENT GENERATORS
  // ============================================
  
  async function createBreadcrumbLink(variant = 'default') {
    const comp = figma.createComponent();
    comp.name = variant === 'hover' ? 'BreadcrumbLink / Hover' : 'BreadcrumbLink / Default';
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.fills = [];
    
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    
    const text = figma.createText();
    text.name = 'Label';
    text.characters = 'Link';
    text.fontSize = TOKENS.fontSize;
    text.fills = [{ 
      type: 'SOLID', 
      color: variant === 'hover' ? TOKENS.colors.foreground : TOKENS.colors.mutedForeground 
    }];
    
    comp.appendChild(text);
    return comp;
  }

  async function createBreadcrumbPage() {
    const comp = figma.createComponent();
    comp.name = 'BreadcrumbPage';
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.fills = [];
    
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    
    const text = figma.createText();
    text.name = 'Label';
    text.characters = 'Current Page';
    text.fontSize = TOKENS.fontSize;
    text.fontName = { family: 'Inter', style: 'Medium' };
    text.fills = [{ type: 'SOLID', color: TOKENS.colors.foreground }];
    
    comp.appendChild(text);
    return comp;
  }

  async function createBreadcrumbSeparator() {
    const comp = figma.createComponent();
    comp.name = 'BreadcrumbSeparator';
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.primaryAxisAlignItems = 'CENTER';
    comp.counterAxisAlignItems = 'CENTER';
    comp.fills = [];
    
    const icon = createChevronIcon(TOKENS.colors.mutedForeground);
    comp.appendChild(icon);
    return comp;
  }

  async function createBreadcrumbEllipsis() {
    const comp = figma.createComponent();
    comp.name = 'BreadcrumbEllipsis';
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.primaryAxisAlignItems = 'CENTER';
    comp.counterAxisAlignItems = 'CENTER';
    comp.paddingTop = 4;
    comp.paddingBottom = 4;
    comp.paddingLeft = 4;
    comp.paddingRight = 4;
    comp.fills = [];
    
    const dots = createEllipsisDots(TOKENS.colors.mutedForeground);
    comp.appendChild(dots);
    return comp;
  }

  async function createBreadcrumbItem(linkComp, sepComp) {
    const comp = figma.createComponent();
    comp.name = 'BreadcrumbItem';
    comp.layoutMode = 'HORIZONTAL';
    comp.itemSpacing = TOKENS.spacing.sm;
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.counterAxisAlignItems = 'CENTER';
    comp.fills = [];
    
    const linkInst = linkComp.createInstance();
    linkInst.name = 'Link';
    comp.appendChild(linkInst);
    
    const sepInst = sepComp.createInstance();
    sepInst.name = 'Separator';
    comp.appendChild(sepInst);
    
    return comp;
  }

  async function createBreadcrumbList(itemComp, pageComp) {
    const comp = figma.createComponent();
    comp.name = 'BreadcrumbList';
    comp.layoutMode = 'HORIZONTAL';
    comp.itemSpacing = TOKENS.spacing.sm;
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.counterAxisAlignItems = 'CENTER';
    comp.fills = [];
    
    // Home
    const item1 = itemComp.createInstance();
    item1.name = 'Item / Home';
    comp.appendChild(item1);
    
    // Components
    const item2 = itemComp.createInstance();
    item2.name = 'Item / Components';
    comp.appendChild(item2);
    
    // Current page (no separator)
    const current = pageComp.createInstance();
    current.name = 'Current Page';
    comp.appendChild(current);
    
    return comp;
  }

  async function createBreadcrumb(listComp) {
    const comp = figma.createComponent();
    comp.name = 'Breadcrumb';
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.fills = [];
    
    const list = listComp.createInstance();
    list.name = 'List';
    comp.appendChild(list);
    
    return comp;
  }

  // ============================================
  // MAIN EXECUTION
  // ============================================
  
  figma.notify('🚀 Generating shadcn Breadcrumb components...');
  
  try {
    // Create main container
    const container = figma.createFrame();
    container.name = '🧩 shadcn/Breadcrumb Component Set';
    container.layoutMode = 'VERTICAL';
    container.itemSpacing = 40;
    container.paddingTop = 40;
    container.paddingRight = 40;
    container.paddingBottom = 40;
    container.paddingLeft = 40;
    container.primaryAxisSizingMode = 'AUTO';
    container.counterAxisSizingMode = 'AUTO';
    container.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    container.cornerRadius = 8;
    
    // Section: Atomic Components
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
    
    const atomicSection = figma.createFrame();
    atomicSection.name = 'Section: Atoms';
    atomicSection.layoutMode = 'VERTICAL';
    atomicSection.itemSpacing = 16;
    atomicSection.primaryAxisSizingMode = 'AUTO';
    atomicSection.counterAxisSizingMode = 'AUTO';
    atomicSection.fills = [];
    
    const atomicLabel = figma.createText();
    atomicLabel.characters = '⚛️ Atomic Components';
    atomicLabel.fontSize = 16;
    atomicLabel.fontName = { family: 'Inter', style: 'Bold' };
    atomicSection.appendChild(atomicLabel);
    
    const atomicRow = figma.createFrame();
    atomicRow.name = 'Atoms Row';
    atomicRow.layoutMode = 'HORIZONTAL';
    atomicRow.itemSpacing = 24;
    atomicRow.primaryAxisSizingMode = 'AUTO';
    atomicRow.counterAxisSizingMode = 'AUTO';
    atomicRow.counterAxisAlignItems = 'CENTER';
    atomicRow.fills = [];
    atomicSection.appendChild(atomicRow);
    
    // Create atoms
    const linkDefault = await createBreadcrumbLink('default');
    const linkHover = await createBreadcrumbLink('hover');
    const page = await createBreadcrumbPage();
    const separator = await createBreadcrumbSeparator();
    const ellipsis = await createBreadcrumbEllipsis();
    
    atomicRow.appendChild(linkDefault);
    atomicRow.appendChild(linkHover);
    atomicRow.appendChild(page);
    atomicRow.appendChild(separator);
    atomicRow.appendChild(ellipsis);
    
    container.appendChild(atomicSection);
    
    // Section: Composite Components
    const compositeSection = figma.createFrame();
    compositeSection.name = 'Section: Composites';
    compositeSection.layoutMode = 'VERTICAL';
    compositeSection.itemSpacing = 16;
    compositeSection.primaryAxisSizingMode = 'AUTO';
    compositeSection.counterAxisSizingMode = 'AUTO';
    compositeSection.fills = [];
    
    const compositeLabel = figma.createText();
    compositeLabel.characters = '🧱 Composite Components';
    compositeLabel.fontSize = 16;
    compositeLabel.fontName = { family: 'Inter', style: 'Bold' };
    compositeSection.appendChild(compositeLabel);
    
    // Create composites
    const item = await createBreadcrumbItem(linkDefault, separator);
    const list = await createBreadcrumbList(item, page);
    const breadcrumb = await createBreadcrumb(list);
    
    compositeSection.appendChild(item);
    compositeSection.appendChild(list);
    compositeSection.appendChild(breadcrumb);
    
    container.appendChild(compositeSection);
    
    // Section: Usage Example
    const usageSection = figma.createFrame();
    usageSection.name = 'Section: Usage';
    usageSection.layoutMode = 'VERTICAL';
    usageSection.itemSpacing = 16;
    usageSection.primaryAxisSizingMode = 'AUTO';
    usageSection.counterAxisSizingMode = 'AUTO';
    usageSection.fills = [];
    
    const usageLabel = figma.createText();
    usageLabel.characters = '📖 Usage Example';
    usageLabel.fontSize = 16;
    usageLabel.fontName = { family: 'Inter', style: 'Bold' };
    usageSection.appendChild(usageLabel);
    
    // Create a demo breadcrumb
    const demoFrame = figma.createFrame();
    demoFrame.name = 'Demo';
    demoFrame.layoutMode = 'HORIZONTAL';
    demoFrame.itemSpacing = 6;
    demoFrame.paddingTop = 12;
    demoFrame.paddingBottom = 12;
    demoFrame.paddingLeft = 16;
    demoFrame.paddingRight = 16;
    demoFrame.primaryAxisSizingMode = 'AUTO';
    demoFrame.counterAxisSizingMode = 'AUTO';
    demoFrame.counterAxisAlignItems = 'CENTER';
    demoFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
    demoFrame.cornerRadius = 6;
    
    // Home > Docs > Components > Breadcrumb
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    
    const labels = ['Home', 'Docs', 'Components', 'Breadcrumb'];
    for (let i = 0; i < labels.length; i++) {
      const text = figma.createText();
      text.characters = labels[i];
      text.fontSize = 14;
      
      if (i === labels.length - 1) {
        text.fontName = { family: 'Inter', style: 'Medium' };
        text.fills = [{ type: 'SOLID', color: TOKENS.colors.foreground }];
      } else {
        text.fills = [{ type: 'SOLID', color: TOKENS.colors.mutedForeground }];
      }
      demoFrame.appendChild(text);
      
      if (i < labels.length - 1) {
        const sep = createChevronIcon(TOKENS.colors.mutedForeground);
        demoFrame.appendChild(sep);
      }
    }
    
    usageSection.appendChild(demoFrame);
    container.appendChild(usageSection);
    
    // Position and select
    container.x = figma.viewport.center.x - 200;
    container.y = figma.viewport.center.y - 200;
    
    figma.currentPage.selection = [container];
    figma.viewport.scrollAndZoomIntoView([container]);
    
    figma.notify('✅ shadcn Breadcrumb generated! Check selection.');
    
    console.log('='.repeat(50));
    console.log('SHADCN BREADCRUMB COMPONENTS CREATED');
    console.log('='.repeat(50));
    console.log('Atoms: BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis');
    console.log('Composites: BreadcrumbItem, BreadcrumbList, Breadcrumb');
    console.log('');
    console.log('Next steps:');
    console.log('1. Move components to your design system library');
    console.log('2. Publish components for team use');
    console.log('3. Bind to Figma Variables for theming');
    console.log('='.repeat(50));
    
  } catch (error) {
    figma.notify('❌ Error: ' + error.message, { error: true });
    console.error('Error:', error);
  }
  
})();
