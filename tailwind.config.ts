
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				secondary: ['Source Sans Pro', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Community Canvas Color Palette
				civic: {
					blue: '#2A6CB0', // Primary Blue
					'blue-hover': '#1E5694', // Darker blue for hover states
					'blue-dark': '#1A3A61', // Deep Navy for dark mode
					green: '#34A853', // Action Green
					'green-dark': '#5CCC8F', // Mint Green for dark mode
					orange: '#FF9800', // Alert Orange
					'orange-dark': '#FFB649', // Amber for dark mode
					purple: '#7B61FF', // Progress Purple
					'purple-dark': '#9D8DFF', // Lavender for dark mode
					light: '#F9F9FB', // Background Light
					dark: '#121826', // Background Dark
					'card-light': '#FFFFFF', // Card Surface
					'card-dark': '#1E293B', // Card Surface Dark
					'text-primary': '#1E293B', // Text Primary
					'text-secondary': '#64748B', // Text Secondary
					'text-primary-dark': '#E2E8F0', // Text Primary Dark
					'text-secondary-dark': '#94A3B8', // Text Secondary Dark
					'border-light': '#E2E8F0', // Border Light
					'border-dark': '#2D3748', // Border Dark
				},
				status: {
					pending: '#FF9800', // Orange for pending issues
					'pending-dark': '#FFB649', // Amber for dark mode
					"in-progress": '#7B61FF', // Purple for in-progress issues
					'in-progress-dark': '#9D8DFF', // Lavender for dark mode
					resolved: '#34A853', // Green for resolved issues
					'resolved-dark': '#5CCC8F', // Mint Green for dark mode
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '0.75rem',
				'2xl': '1rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					from: { opacity: '1', transform: 'translateY(0)' },
					to: { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.95)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'scale-out': {
					from: { opacity: '1', transform: 'scale(1)' },
					to: { opacity: '0', transform: 'scale(0.95)' }
				},
				'slide-in': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				'pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
				'vote-ping': {
					'0%': { transform: 'scale(0.95)', opacity: '1' },
					'75%, 100%': { transform: 'scale(1.2)', opacity: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'pulse': 'pulse 1.5s ease-in-out infinite',
				'vote-ping': 'vote-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
				'float': 'float 3s ease-in-out infinite',
				'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 8s linear infinite',
			},
			boxShadow: {
				'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
				'card-hover': '0 8px 16px rgba(0, 0, 0, 0.12)',
				'dropdown': '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
