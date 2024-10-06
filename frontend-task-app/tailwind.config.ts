import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			bankGradient: '#0179FE',
  			indigo: {
  				'500': '#6172F3',
  				'700': '#3538CD'
  			},
  			success: {
  				'25': '#F6FEF9',
  				'50': '#ECFDF3',
  				'100': '#D1FADF',
  				'600': '#039855',
  				'700': '#027A48',
  				'900': '#054F31'
  			},
  			pink: {
  				'25': '#FEF6FB',
  				'100': '#FCE7F6',
  				'500': '#EE46BC',
  				'600': '#DD2590',
  				'700': '#C11574',
  				'900': '#851651'
  			},
  			blue: {
  				'25': '#F5FAFF',
  				'100': '#D1E9FF',
  				'500': '#2E90FA',
  				'600': '#1570EF',
  				'700': '#175CD3',
  				'900': '#194185'
  			},
  			sky: {
  				'1': '#F3F9FF'
  			},
  			black: {
  				'1': '#00214F',
  				'2': '#344054'
  			},
  			gray: {
  				'25': '#FCFCFD',
  				'200': '#EAECF0',
  				'300': '#D0D5DD',
  				'500': '#667085',
  				'600': '#475467',
  				'700': '#344054',
  				'900': '#101828'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		primary: '#1D4ED8',
  		fontFamily: {
  			inter: 'var(--font-inter)',
  			'ibm-plex-serif': 'var(--font-ibm-plex-serif)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
