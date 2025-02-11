import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
       "scroll-horizontal": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" }, // Move left fully
        },
        "scroll-horizontal-reverse": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" }, // Move right fully
        },
      },
      animation: {
        'scroll-horizontal': 'scroll-horizontal 200s linear infinite',
        'scroll-horizontal-reverse': 'scroll-horizontal-reverse 200s linear infinite'
        
      },
      
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;