/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stonegrid: {
          50: "#FAF9F5",
          100: "#F4F2EC",
          150: "#EEF1F4",
          200: "#E1E7EC",
          300: "#CDD7DF",
          400: "#9EACB8",
          600: "#617282",
          800: "#273A4D",
          950: "#102033",
        },

        /*
          Premium Enterprise Diagnostic Blue

          brandgreen = primary blue
          brandyellow = soft technical accent blue

          Keeping these token names prevents component breakage.
        */
        brandgreen: {
          500: "#215D86",
          600: "#173F5F",
        },
        brandyellow: {
          500: "#6FAFD2",
          600: "#3E86AE",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 18px 50px rgba(16, 32, 51, 0.08)",
        soft: "0 28px 80px rgba(16, 32, 51, 0.13)",
        glow: "0 0 0 1px rgba(111, 175, 210, 0.18), 0 24px 70px rgba(16, 32, 51, 0.10)",
      },
    },
  },
  plugins: [],
}