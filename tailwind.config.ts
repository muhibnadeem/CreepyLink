import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blood: '#8b0000',
        void: '#0b0b0b',
        ash: '#b0b0b0',
      },
      fontFamily: {
        creepy: ['"Creepster"', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;
