// timeline-component/.storybook/main.ts

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // 1. Where to find your stories (.stories.tsx files)
  stories: [
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)", 
  ],
  
  // 2. Essential Storybook Addons
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // CRITICAL: Required for verifying accessibility (WCAG 2.1 AA)
    "@storybook/addon-a11y", 
  ],
  
  // 3. Define the framework (React with Vite)
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  
  // 4. Automatic documentation generation
  docs: {
    autodocs: "tag",
  },
};
export default config;