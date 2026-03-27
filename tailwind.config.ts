import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        glow: "var(--glow)",
        "glow-strong": "var(--glow-strong)",
        border: "var(--border)",
        muted: "var(--text-muted)",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px var(--glow)",
        "glow-md": "0 0 40px var(--glow-strong)",
        "glow-lg": "0 0 60px var(--glow-strong)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(var(--glow) 1px, transparent 1px), linear-gradient(90deg, var(--glow) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-50": "50px 50px",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px var(--glow)" },
          "50%": { boxShadow: "0 0 30px var(--glow-strong)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
