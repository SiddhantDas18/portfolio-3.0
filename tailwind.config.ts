import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        music: {
          '0%, 100%': { height: '0.75rem' },
          '50%': { height: '1.5rem' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 