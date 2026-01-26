/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", "system-ui", "sans-serif"],
        secondary: ["Playfair Display", "serif"],
      },
      colors: {
        background: "#0B0B0B",
        surfaceGlass: "rgba(255,255,255,0.06)",
        borderGlass: "rgba(255,255,255,0.12)",
        textPrimary: "#FFFFFF",
        textSecondary: "rgba(255,255,255,0.72)",
        accent: "#C89B3C",
        danger: "#E5484D",
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        pill: "999px",
      },
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "48px",
        xl: "72px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
      },
      backdropBlur: {
        glass: "12px",
      }
    },
  },
  plugins: [],
}
