
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
				heading: ['Montserrat', 'sans-serif'],
				display: ['SF Pro Display', 'sans-serif'],
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
				civic: {
					blue: '#3B82F6', // Primary Blue
					'blue-hover': '#2563EB', // Darker blue for hover states
					'blue-dark': '#60A5FA', // Light Blue for dark mode
					green: '#10B981', // Action Green
					'green-dark': '#34D399', // Light Green for dark mode
					orange: '#F59E0B', // Alert Orange
					'orange-dark': '#FBBF24', // Yellow for dark mode
					purple: '#8B5CF6', // Progress Purple
					'purple-dark': '#A78BFA', // Light Purple for dark mode
					light: '#F8FAFC', // Background Light
					dark: '#0F172A', // Background Dark
					'card-light': '#FFFFFF', // Card Surface
					'card-dark': '#1E293B', // Card Surface Dark
					'text-primary': '#1E293B', // Text Primary
					'text-secondary': '#64748B', // Text Secondary
					'text-primary-dark': '#F1F5F9', // Text Primary Dark
					'text-secondary-dark': '#94A3B8', // Text Secondary Dark
					'border-light': '#E2E8F0', // Border Light
					'border-dark': '#334155', // Border Dark
				},
				status: {
					pending: '#F59E0B', // Orange for pending issues
					'pending-dark': '#FBBF24', // Yellow for dark mode
					"in-progress": '#8B5CF6', // Purple for in-progress issues
					'in-progress-dark': '#A78BFA', // Light Purple for dark mode
					resolved: '#10B981', // Green for resolved issues
					'resolved-dark': '#34D399', // Light Green for dark mode
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem',
			},
			boxShadow: {
				'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
				'card-hover': '0 10px 30px rgba(0, 0, 0, 0.12)',
				'dropdown': '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
				'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
				'3d': '0 10px 30px -15px rgba(0, 0, 0, 0.25)',
				'inner-glow': 'inset 0 0 15px rgba(59, 130, 246, 0.2)',
				'cutout': '0 0 0 2px rgba(255, 255, 255, 1), 0 10px 25px -3px rgba(0, 0, 0, 0.2)',
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
				'reveal-right': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'reveal-left': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'reveal-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'reveal-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'reveal-scale': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'blur-in': {
					'0%': { filter: 'blur(5px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' },
				},
				'confetti-fall': {
					'0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' },
				},
				'grain': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'10%': { transform: 'translate(-5%, -10%)' },
					'30%': { transform: 'translate(3%, -15%)' },
					'50%': { transform: 'translate(12%, 9%)' },
					'70%': { transform: 'translate(9%, 4%)' },
					'90%': { transform: 'translate(-1%, 7%)' },
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
				'reveal-right': 'reveal-right 0.5s ease-out forwards',
				'reveal-left': 'reveal-left 0.5s ease-out forwards',
				'reveal-up': 'reveal-up 0.5s ease-out forwards',
				'reveal-down': 'reveal-down 0.5s ease-out forwards',
				'reveal-scale': 'reveal-scale 0.5s ease-out forwards',
				'blur-in': 'blur-in 0.5s ease-out forwards',
				'confetti-fall': 'confetti-fall 3s ease-in-out forwards',
				'ripple': 'ripple 0.6s linear',
				'grain': 'grain 8s steps(10) infinite',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
