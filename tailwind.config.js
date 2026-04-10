/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      /* Couleurs personnalisées */
      colors: {
        neon: 'var(--color-neon)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        card: 'var(--color-card)',
        muted: 'var(--color-muted)',
        bg: 'var(--color-bg)',
      },
      
      /* Familles de polices */
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      
      /* Shadows personnalisées */
      boxShadow: {
        neon: '0 0 18px var(--color-neon)',
        card: '0 0 0 1px var(--color-card)',
      },
      
      /* Animations personnalisées */
      animation: {
        marquee: 'marquee 18s linear infinite',
        blink: 'blink 1.2s step-end infinite',
        fadeup: 'fadeup .6s ease both',
      },
      
      /* Keyframes */
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeup: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
