/**
 * Shadcn Breadcrumb Component Generator for Figma
 * 
 * MVP: Generates a complete shadcn-styled breadcrumb component set
 * Run this in Figma's Plugin Developer Console (Plugins > Development > Open Console)
 * 
 * This creates:
 * - Design tokens as Figma Variables
 * - Atomic components (BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbEllipsis)
 * - Composite component (Breadcrumb with BreadcrumbList)
 * - Component variants for states (default, hover)
 */

// ============================================
// SHADCN DESIGN TOKENS (from shadcn CSS variables)
// ============================================
const SHADCN_TOKENS = {
  colors: {
    // Light mode
    light: {
      foreground: { r: 0.02, g: 0.02, b: 0.02 },           // hsl(240 10% 3.9%)
      mutedForeground: { r: 0.45, g: 0.45, b: 0.47 },      // hsl(240 3.8% 46.1%)
      background: { r: 1, g: 1, b: 1 },                     // white
      border: { r: 0.9, g: 0.9, b: 0.9 },                   // hsl(240 5.9% 90%)
    },
    // Dark mode
    dark: {
      foreground: { r: 0.98, g: 0.98, b: 0.98 },           // hsl(0 0% 98%)
      mutedForeground: { r: 0.64, g: 0.64, b: 0.66 },      // hsl(240 5% 64.9%)
      background: { r: 0.02, g: 0.02, b: 0.02 },           // hsl(240 10% 3.9%)
      border: { r: 0.15, g: 0.15, b: 0.16 },               // hsl(240 3.7% 15.9%)
    }
  },
  spacing: {
    xs: 4,      // 0.25rem
    sm: 6,      // 0.375rem (gap-1.5)
    md: 8,      // 0.5rem (gap-2)
    lg: 12,     // 0.75rem
    xl: 16,     // 1rem
  },
  typography: {
    fontSize: 14,         // text-sm
    lineHeight: 20,       // leading-5
    fontFamily: 'Inter',  // or system font
    fontWeight: {
      normal: 400,
      medium: 500,
    }
  },
  iconSize: 14,           // size-3.5 = 14px
  borderRadius: 6,        // rounded-md
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function createVariableCollection(name: string): VariableCollection {
  return figma.variables.createVariableCollection(name);
}

function setVariableModeValue(
  variable: Variable,
  collection: VariableCollection,
  modeId: string,
  value: RGB | number | string
) {
  variable.setValueForMode(modeId, value);
}

function createAutoLayoutFrame(
  name: string,
  direction: 'HORIZONTAL' | 'VERTICAL',
  gap: number,
  padding: { top: number; right: number; bottom: number; left: number }
): FrameNode {
  const frame = figma.createFrame();
  frame.name = name;
  frame.layoutMode = direction;
  frame.itemSpacing = gap;
  frame.paddingTop = padding.top;
  frame.paddingRight = padding.right;
  frame.paddingBottom = padding.bottom;
  frame.paddingLeft = padding.left;
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.fills = [];
  return frame;
}

function createText(
  content: string,
  fontSize: number,
  color: RGB,
  fontWeight: number = 400
): TextNode {
  const text = figma.createText();
  text.characters = content;
  text.fontSize = fontSize;
  text.fills = [{ type: 'SOLID', color }];
  // Note: fontName must be loaded first in actual plugin
  return text;
}

// ============================================
// CHEVRON RIGHT ICON (SVG Path as Vector)
// ============================================
function createChevronRightIcon(color: RGB, size: number = 14): VectorNode {
  const vector = figma.createVector();
  vector.name = 'ChevronRight';
  
  // Chevron right path data (simplified from Lucide)
  // M9 18l6-6-6-6 scaled to 14x14
  vector.vectorPaths = [{
    windingRule: 'NONZERO',
    data: 'M 5.25 12.25 L 8.75 7 L 5.25 1.75'
  }];
  
  vector.resize(size, size);
  vector.strokes = [{ type: 'SOLID', color }];
  vector.strokeWeight = 1.5;
  vector.strokeCap = 'ROUND';
  vector.strokeJoin = 'ROUND';
  vector.fills = [];
  
  return vector;
}

// ============================================
// ELLIPSIS ICON (three dots)
// ============================================
function createEllipsisIcon(color: RGB, size: number = 14): FrameNode {
  const container = figma.createFrame();
  container.name = 'MoreHorizontal';
  container.resize(size, size);
  container.fills = [];
  container.layoutMode = 'HORIZONTAL';
  container.itemSpacing = 2;
  container.primaryAxisAlignItems = 'CENTER';
  container.counterAxisAlignItems = 'CENTER';
  
  // Create 3 dots
  for (let i = 0; i < 3; i++) {
    const dot = figma.createEllipse();
    dot.resize(3, 3);
    dot.fills = [{ type: 'SOLID', color }];
    container.appendChild(dot);
  }
  
  return container;
}

// ============================================
// COMPONENT CREATORS
// ============================================

async function createBreadcrumbLink(
  isHover: boolean = false
): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = isHover ? 'BreadcrumbLink/Hover' : 'BreadcrumbLink/Default';
  
  // Setup auto-layout
  component.layoutMode = 'HORIZONTAL';
  component.itemSpacing = 0;
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.fills = [];
  
  // Load font
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  
  // Create text
  const text = figma.createText();
  text.name = 'Label';
  text.characters = 'Link';
  text.fontSize = SHADCN_TOKENS.typography.fontSize;
  
  const color = isHover 
    ? SHADCN_TOKENS.colors.light.foreground 
    : SHADCN_TOKENS.colors.light.mutedForeground;
  
  text.fills = [{ type: 'SOLID', color }];
  
  component.appendChild(text);
  
  return component;
}

async function createBreadcrumbPage(): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = 'BreadcrumbPage';
  
  component.layoutMode = 'HORIZONTAL';
  component.itemSpacing = 0;
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.fills = [];
  
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  
  const text = figma.createText();
  text.name = 'Label';
  text.characters = 'Current Page';
  text.fontSize = SHADCN_TOKENS.typography.fontSize;
  text.fontName = { family: 'Inter', style: 'Medium' };
  text.fills = [{ type: 'SOLID', color: SHADCN_TOKENS.colors.light.foreground }];
  
  component.appendChild(text);
  
  return component;
}

async function createBreadcrumbSeparator(): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = 'BreadcrumbSeparator';
  
  component.layoutMode = 'HORIZONTAL';
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.primaryAxisAlignItems = 'CENTER';
  component.counterAxisAlignItems = 'CENTER';
  component.fills = [];
  
  const icon = createChevronRightIcon(
    SHADCN_TOKENS.colors.light.mutedForeground,
    SHADCN_TOKENS.iconSize
  );
  
  component.appendChild(icon);
  
  return component;
}

async function createBreadcrumbEllipsis(): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = 'BreadcrumbEllipsis';
  
  component.layoutMode = 'HORIZONTAL';
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.primaryAxisAlignItems = 'CENTER';
  component.counterAxisAlignItems = 'CENTER';
  component.paddingTop = 2;
  component.paddingBottom = 2;
  component.paddingLeft = 2;
  component.paddingRight = 2;
  component.fills = [];
  
  const icon = createEllipsisIcon(
    SHADCN_TOKENS.colors.light.mutedForeground,
    SHADCN_TOKENS.iconSize
  );
  
  component.appendChild(icon);
  
  return component;
}

async function createBreadcrumbItem(
  linkComponent: ComponentNode,
  separatorComponent: ComponentNode
): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = 'BreadcrumbItem';
  
  component.layoutMode = 'HORIZONTAL';
  component.itemSpacing = SHADCN_TOKENS.spacing.sm; // gap-1.5
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.counterAxisAlignItems = 'CENTER';
  component.fills = [];
  
  // Add link instance
  const linkInstance = linkComponent.createInstance();
  linkInstance.name = 'Link';
  component.appendChild(linkInstance);
  
  // Add separator instance
  const separatorInstance = separatorComponent.createInstance();
  separatorInstance.name = 'Separator';
  component.appendChild(separatorInstance);
  
  return component;
}

async function createBreadcrumbList(
  itemComponent: ComponentNode,
  pageComponent: ComponentNode,
  separatorComponent: ComponentNode
): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = 'BreadcrumbList';
  
  component.layoutMode = 'HORIZONTAL';
  component.itemSpacing = SHADCN_TOKENS.spacing.sm; // gap-1.5
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.counterAxisAlignItems = 'CENTER';
  component.fills = [];
  
  // Home item
  const homeItem = itemComponent.createInstance();
  homeItem.name = 'Home';
  // Update text to "Home" - would need property binding in real implementation
  component.appendChild(homeItem);
  
  // Components item
  const componentsItem = itemComponent.createInstance();
  componentsItem.name = 'Components';
  component.appendChild(componentsItem);
  
  // Current page (no separator)
  const currentPage = pageComponent.createInstance();
  currentPage.name = 'Current';
  component.appendChild(currentPage);
  
  return component;
}

async function createBreadcrumb(
  listComponent: ComponentNode
): Promise<ComponentNode> {
  const component = figma.createComponent();
  component.name = 'Breadcrumb';
  
  // Main nav container
  component.layoutMode = 'HORIZONTAL';
  component.primaryAxisSizingMode = 'AUTO';
  component.counterAxisSizingMode = 'AUTO';
  component.fills = [];
  
  // Add list instance
  const listInstance = listComponent.createInstance();
  listInstance.name = 'BreadcrumbList';
  component.appendChild(listInstance);
  
  return component;
}

// ============================================
// MAIN GENERATOR FUNCTION
// ============================================
async function generateShadcnBreadcrumb(): Promise<void> {
  // Notify user
  figma.notify('Generating shadcn Breadcrumb components...');
  
  try {
    // Create a container frame for all components
    const container = figma.createFrame();
    container.name = 'shadcn/Breadcrumb';
    container.layoutMode = 'VERTICAL';
    container.itemSpacing = 32;
    container.paddingTop = 32;
    container.paddingRight = 32;
    container.paddingBottom = 32;
    container.paddingLeft = 32;
    container.primaryAxisSizingMode = 'AUTO';
    container.counterAxisSizingMode = 'AUTO';
    container.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    
    // Create section labels
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
    
    const atomicLabel = figma.createText();
    atomicLabel.characters = 'Atomic Components';
    atomicLabel.fontSize = 18;
    atomicLabel.fontName = { family: 'Inter', style: 'Bold' };
    container.appendChild(atomicLabel);
    
    // Atomic components container
    const atomicContainer = figma.createFrame();
    atomicContainer.name = 'Atoms';
    atomicContainer.layoutMode = 'HORIZONTAL';
    atomicContainer.itemSpacing = 24;
    atomicContainer.primaryAxisSizingMode = 'AUTO';
    atomicContainer.counterAxisSizingMode = 'AUTO';
    atomicContainer.fills = [];
    container.appendChild(atomicContainer);
    
    // Create atomic components
    const linkDefault = await createBreadcrumbLink(false);
    const linkHover = await createBreadcrumbLink(true);
    const page = await createBreadcrumbPage();
    const separator = await createBreadcrumbSeparator();
    const ellipsis = await createBreadcrumbEllipsis();
    
    atomicContainer.appendChild(linkDefault);
    atomicContainer.appendChild(linkHover);
    atomicContainer.appendChild(page);
    atomicContainer.appendChild(separator);
    atomicContainer.appendChild(ellipsis);
    
    // Composite components label
    const compositeLabel = figma.createText();
    compositeLabel.characters = 'Composite Components';
    compositeLabel.fontSize = 18;
    compositeLabel.fontName = { family: 'Inter', style: 'Bold' };
    container.appendChild(compositeLabel);
    
    // Create composite components
    const item = await createBreadcrumbItem(linkDefault, separator);
    const list = await createBreadcrumbList(item, page, separator);
    const breadcrumb = await createBreadcrumb(list);
    
    // Composite components container
    const compositeContainer = figma.createFrame();
    compositeContainer.name = 'Composites';
    compositeContainer.layoutMode = 'VERTICAL';
    compositeContainer.itemSpacing = 16;
    compositeContainer.primaryAxisSizingMode = 'AUTO';
    compositeContainer.counterAxisSizingMode = 'AUTO';
    compositeContainer.fills = [];
    container.appendChild(compositeContainer);
    
    compositeContainer.appendChild(item);
    compositeContainer.appendChild(list);
    compositeContainer.appendChild(breadcrumb);
    
    // Position in viewport
    container.x = figma.viewport.center.x - container.width / 2;
    container.y = figma.viewport.center.y - container.height / 2;
    
    // Select the container
    figma.currentPage.selection = [container];
    figma.viewport.scrollAndZoomIntoView([container]);
    
    figma.notify('✅ shadcn Breadcrumb components generated successfully!');
    
  } catch (error) {
    figma.notify(`❌ Error: ${error}`, { error: true });
    console.error(error);
  }
}

// ============================================
// EXECUTE
// ============================================
generateShadcnBreadcrumb();
