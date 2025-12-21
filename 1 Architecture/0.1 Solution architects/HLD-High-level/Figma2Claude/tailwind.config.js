/** @type {import('tailwindcss').Config} */

/**
 * BAIV Brand Tokens - Tailwind CSS Configuration
 * 
 * This extends your tailwind.config.js with brand tokens.
 * 
 * Usage:
 * 1. Import and spread into your tailwind.config.js
 * 2. Or copy the theme.extend section into your existing config
 */

const brandTokens = {
  theme: {
    extend: {
      // =========================================================================
      // COLORS
      // Uses CSS variables so themes can be switched at runtime
      // =========================================================================
      colors: {
        // Primitives (for reference)
        primitive: {
          blue: {
            400: '#60A5FA',
            500: '#3B82F6',
            600: '#2563EB',
          },
          teal: {
            500: '#00a4bf',
            600: '#005260',
          },
          purple: {
            500: '#8B5CF6',
          },
          orange: {
            500: '#e84e1c',
          },
          pink: {
            500: '#EC4899',
            600: '#cf057d',
          },
          gold: {
            500: '#cec528',
          },
          slate: {
            500: '#64748B',
          },
          green: {
            500: '#10B981',
            600: '#019587',
          },
          amber: {
            500: '#F59E0B',
          },
          red: {
            500: '#EF4444',
          },
          navy: {
            700: '#1c3e8e',
          },
        },
        
        // Semantic colors (reference CSS variables for theme switching)
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        neutral: {
          DEFAULT: 'var(--neutral)',
          foreground: 'var(--neutral-foreground)',
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },
        error: {
          DEFAULT: 'var(--error)',
          foreground: 'var(--error-foreground)',
        },
        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)',
        },
        
        // Surface colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        surface: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--surface-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
      },

      // =========================================================================
      // TYPOGRAPHY
      // =========================================================================
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        
        // Direct font families (for build-time resolution)
        inter: ['Inter', 'system-ui', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'open-sans': ['Open Sans', 'system-ui', 'sans-serif'],
        'titillium': ['Titillium Web', 'system-ui', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'ui-monospace', 'monospace'],
      },
      
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
        '6xl': ['60px', { lineHeight: '1' }],
      },
      
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },

      // =========================================================================
      // SPACING
      // 8px grid system
      // =========================================================================
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
      },

      // =========================================================================
      // BORDER RADIUS
      // =========================================================================
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': 'var(--radius)',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },

      // =========================================================================
      // SHADOWS
      // =========================================================================
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },

      // =========================================================================
      // TRANSITIONS
      // =========================================================================
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // =========================================================================
      // BREAKPOINTS
      // =========================================================================
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      // =========================================================================
      // CONTAINER
      // =========================================================================
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },

      // =========================================================================
      // Z-INDEX
      // =========================================================================
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },

      // =========================================================================
      // ANIMATIONS
      // =========================================================================
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'fade-out': 'fade-out 200ms ease-in',
        'slide-in-from-top': 'slide-in-from-top 300ms ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 300ms ease-out',
        'scale-in': 'scale-in 200ms ease-out',
      },
    },
  },
  
  plugins: [],
};

module.exports = brandTokens;

// =============================================================================
// USAGE EXAMPLE
// =============================================================================
// 
// In your tailwind.config.js:
//
// const brandTokens = require('./brand-tokens/tailwind.config.js');
//
// module.exports = {
//   content: ['./src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       ...brandTokens.theme.extend,
//       // Your additional customizations here
//     },
//   },
//   plugins: [
//     ...brandTokens.plugins,
//     // Your additional plugins here
//   ],
// };
