/**
 * Safe clipboard utility with fallback for environments where Clipboard API is blocked
 */

/**
 * Safely copy text to clipboard with fallback method
 * 
 * @param text - Text to copy to clipboard
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, trying fallback method:', err);
    }
  }

  // Fallback method using execCommand (works in more restricted environments)
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Make it invisible but still focusable
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.style.opacity = '0';
    
    // Append to body
    document.body.appendChild(textarea);
    
    // Select the text
    textarea.focus();
    textarea.select();
    
    // Try to copy
    const successful = document.execCommand('copy');
    
    // Clean up
    document.body.removeChild(textarea);
    
    if (successful) {
      return true;
    }
    
    console.error('Fallback copy method failed');
    return false;
  } catch (err) {
    console.error('All clipboard copy methods failed:', err);
    return false;
  }
}
