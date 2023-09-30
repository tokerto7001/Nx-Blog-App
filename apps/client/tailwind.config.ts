import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      primary: '#0F1224',
      secondary: '#3C468F',
      rexRed: '#E3211E',
      lightGray: '#EDEEF8',
      backgroundDefault: '#F8F8F8',
      headerPrimary: '#1F254B',
      headingPrimary: '#2D356C',
      headingSecondary: '#B7BCE1',
      cardBorder: '#6F7AC3',
      description: '#070912',
      purpleLight: '#EDE9FE',
      purpleDark: '#5502D7',
      purpleMid: '#A78BFA',
      greenLight: '#D1FAE5',
      greenDark: '#047857',
      greenMid: '#34D399',
      blueLight: '#CFFAFE',
      blueDark: '#0E7490',
      blueMid: '#22D3EE',
      yellowLight: '#FEF3C7',
      yellowDark: '#B45309',
      yellowMid: '#FBBF24',
      navTitle: '#939BD2',
      pricingGreen: '#0D9488',
      pricingHeading: '#0C4A6E',

      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
    },
  },
  plugins: [],
}
export default config
