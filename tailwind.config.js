/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];

export const darkMode = "class";

export const theme = {
  extend: {
    boxShadow: {
      "card-hover-dark":
        "0px 0px 0px 1px rgba(255, 255, 255, 0.2), 0px 1px 2px -1px rgba(255, 255, 255, 0.32), 0px 2px 8px 0px rgba(0, 0, 0, 0.64)",
      "card-hover-light":
        "0px 0px 0px 1px rgba(17, 24, 28, 0.08), 0px 1px 2px -1px rgba(17, 24, 28, 0.08), 0px 2px 8px 0px rgba(17, 24, 28, 0.1)",
      "card-rest-dark":
        "0px 0px 0px 1px rgba(255, 255, 255, 0.1), 0px 1px 2px -1px rgba(255, 255, 255, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.32);",
    },
    backgroundColor: {
      "base-dark": "#1C1C1C",
      "base-light": "#FFFFFF",
      "button-hover": "#2E2E32",
      "button-inverted-hover": "#F4F2F4",
      "code-base-dark": "#1C1C1F",
      "code-header-dark": "#161618",
      "field-dark": "#232326",
      "field-light": "#F8F9FA",
      "subtle-dark": "#161618",
      "subtle-light": "#F8F9FA",
      "subtle-darker": "#7E7D86",
      "subtle-lighter": "#687076",
      "overlay-dark": "rgba(22, 22, 24, 0.7)",
      "overlay-light": "rgba(17, 24, 28, 0.4)",
      "tag-neutral-dark": "#28282C",
      "tag-neutral-light": "#F1F3F5",
      "tag-blue-dark": "#102A4C",
      "tag-blue-light": "#E1F0FF",
      focus: "#6E56CF",
    },
    borderColor: {
      "base-dark": "#2E2E32",
      "base-light": "#E6E8EB",
      "neutral-button-dark": "rgba(255, 255, 255, 0.12)",
      "neutral-button-light": "rgba(17, 24, 28, 0.1)",
      "color-button-dark": "#FFFFFF",
      "color-button-light": "#11181C",
      "tag-neutral-dark": "#34343A",
      "tag-neutral-light": "#DFE3E6",
      "tag-blue-dark": "#0D3868",
      "tag-blue-light": "#B7D9F8",
      focus: "#6E56CF",
    },
    textColor: {
      "base-dark": "#FFFFFF",
      "base-light": "#11181C",
      "muted-dark": "#706F78",
      "muted-light": "#889096",
      "subtle-dark": "#7E7D86",
      "subtle-light": "#687076",
      "error-dark": "#E5484D",
      "error-light": "#E5484D",
      "tag-neutral-dark": "#A09FA6",
      "tag-neutral-light": "#687076",
      "tag-blue-dark": "#52A9FF",
      "tag-blue-light": "#006ADC",
      "tag-purple": "#9E8CFC",
      "icon-base-dark": "#EDEDEF",
      "icon-base-light": "#11181C",
      "icon-subtle-dark": "#7E7D86",
      "icon-subtle-light": "#687076",
      "icon-muted-dark": "#706F78",
      "icon-muted-light": "#889096",
    },
    outlineColor: {
      focus: "#6E56CF",
    },
    fontSize: {
      "labels-large": ["16px", "20px"],
      "labels-regular": ["14px", "20px"],
      "labels-small": ["13px", "20px"],
      "labels-xsmall": ["12px", "20px"],
      "body-regular": ["14px", "24px"],
      "headers-h2": ["32px", "44px"],
      "headers-h3": ["24px", "32px"],
      "headers-h4": ["18px", "28px"],
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      blink: {
        "0%": { opacity: 0.2 },
        "20%": { opacity: 1 },
        "100% ": { opacity: 0.2 },
      },
    },
    animation: {
      fadeIn: "fadeIn .3s ease-in-out",
      fadeOut: "fadeOut .3s ease-in-out",
      blink: "blink 1.4s both infinite",
    },
  },
};
export const plugins = [
  plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "animation-delay": (value) => {
          return {
            "animation-delay": value,
          };
        },
      },
      {
        values: theme("transitionDelay"),
      }
    );
  }),
];
