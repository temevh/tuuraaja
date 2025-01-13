/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gradientstart: "#8BC6EC",
        gradientend: "#9599E2",
        buttonprimary: "#007BFF",
        buttonsecondary: "#0056b3",
      },
    },
  },
  plugins: [],
};
