import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,mdx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
      '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['2.5rem', { lineHeight: '3rem' }],
      '6xl': ['3rem', { lineHeight: '3.5rem' }],
      '7xl': ['4rem', { lineHeight: '4.5rem' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2.5rem',
      },
      colors: {
        // Redesign palette (docs/redesign/inspiration.md). neutral-950 is
        // remapped to graphite ink so existing dark surfaces pick it up.
        // neutral-500 is darkened from #737373 so small grey text passes AA
        // (4.5:1) on paper.
        neutral: { 500: '#525252', 950: '#1A1D29' },
        paper: '#F2F3EF',
        blueprint: '#DCE0FF',
        // Darker than Radix red9 so small red text passes AA on paper.
        redline: '#C2292E',
        accent: {
          DEFAULT: '#2C39FF',
          50: '#EEF0FF',
          100: '#DCE0FF',
          200: '#B8C1FF',
          300: '#94A2FF',
          400: '#7083FF',
          500: '#2C39FF',
          600: '#1F29D9',
          700: '#161DA6',
          800: '#0E1373',
          900: '#070940',
        },
      },
      fontFamily: {
        sans: ['var(--font-mona-sans)', ...defaultTheme.fontFamily.sans],
        display: [
          ['var(--font-mona-sans)', ...defaultTheme.fontFamily.sans],
          { fontVariationSettings: '"wdth" 125' },
        ],
        // Condensed cut for labels and annotations, in place of mono labels.
        condensed: [
          ['var(--font-mona-sans)', ...defaultTheme.fontFamily.sans],
          { fontVariationSettings: '"wdth" 75' },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config
