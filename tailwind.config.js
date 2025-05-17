/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo
        secondary: "#10B981", // Emerald
        accent: "#6366F1", // Indigo
        background: "#F9FAFB", // Gray-50
        "text-primary": "#111827", // Gray-900
        "text-secondary": "#6B7280", // Gray-500
      },
    },
  },
  plugins: [],
};