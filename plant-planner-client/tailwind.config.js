/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./!(build|dist|.*)/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-60": "#0f62fe",
        gray: "rgba(255, 255, 255, 0.25)",
        "default-white": "#fff",
        "coolgray-100": "#121619",
        "coolgray-90": "#21272a",
        "coolgray-10": "#f2f4f8",
        "coolgray-30": "#c1c7cd",
        "coolgray-60": "#697077",
        "primary-90": "#001d6c",
        darkslategray: "#283618",
        "coolgray-20": "#dde1e6",
        darkolivegreen: "#606c38",
        forrestgreen: "#283618",
        camel: "#BC6C25"
      },
      fontFamily: {
        "button-m": "Roboto",
      },
    },
    fontSize: {
      base: "16px",
      sm: "14px",
      xs: "12px",
      lg: "18px",
      "23xl": "42px",
      "35xl": "54px",
      xl: "20px",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      md: {
        max: "960px",
      },
      sm: {
        max: "420px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
