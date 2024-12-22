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
        gradientstart: "#0f2027",
        gradientend: "#2c5364",
        buttonprimary: "#007BFF",
        buttonsecondary: "#0056b3",
      },
    },
  },
  plugins: [],
};
