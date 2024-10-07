/* eslint-disable global-require */
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    colors: {
      transparent: 'transparent',
      inherit: 'inherit',
      current: 'currentColor',
      white: 'hsl(var(--white))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        dark: 'hsl(var(--primary-dark))',
        light: {
          DEFAULT: 'hsl(var(--primary-light))',
          blue: 'hsl(var(--primary-light-blue))',
        },
      },
      secondary: {
        dark: 'hsl(var(--secondary-dark))',
        light: 'hsl(var(--secondary-light))',

        /* ShadcnUI built-in
            TODO: Remove or replace
          */
        DEFAULT: 'hsl(var(--secondary))',
      },
      attention: {
        DEFAULT: 'hsl(var(--attention))',
        light: 'hsl(var(--attention-light))',
      },
      error: {
        DEFAULT: 'hsl(var(--error))',
        light: 'hsl(var(--error-light))',
        lighter: 'hsl(var(--error-lighter))',
      },
      info: {
        DEFAULT: 'hsl(var(--info))',
        light: 'hsl(var(--info-light))',
      },
      success: {
        DEFAULT: 'hsl(var(--success))',
        light: 'hsl(var(--success-light))',
      },
      warning: {
        DEFAULT: 'hsl(var(--warning))',
        light: 'hsl(var(--warning-light))',
      },
      sidebar: {
        DEFAULT: 'hsl(var(--sidebar))',
        hover: 'hsl(var(--sidebar-hover))',
        active: 'hsl(var(--sidebar-active))',
      },
      disabled: {
        DEFAULT: 'hsl(var(--disabled))',
        stroke: 'hsl(var(--disabled-stroke))',
      },
      stroke: 'hsl(var(--stroke))',
      shadow: 'hsl(var(--black) / 0.15)',
      prefix: 'hsl(var(--prefix))',
      layout: 'hsl(var(--layout))',
      auth: {
        DEFAULT: 'hsl(var(--auth))',
        dark: 'hsl(var(--auth-dark))',
        stroke: 'hsl(var(--auth-stroke))',
      },
      label: 'hsl(var(--label))',
      dialog: {
        title: 'hsl(var(--dialog-title))',
      },

      /* ShadcnUI built-in
          TODO: Remove or replace
        */
      destructive: 'hsl(var(--destructive))',
      ring: 'hsl(var(--ring))',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
      spacing: {
        '3.5': '0.875rem',
        '8.5': '2.125rem',
        '11.5': '2.875rem',
      },
      padding: {
        '2.25': '0.563rem',
      },
      height: {
        '12.5': '3.125rem',
      },
      lineHeight: {
        '5.5': '1.375rem',
      },
      zIndex: {
        '100': '100',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-45': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        top: '0 -4px 3px hsl(var(--black) / 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
