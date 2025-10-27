// timeline-component/.storybook/preview.ts

import type { Preview } from '@storybook/react';
// CRITICAL: Import your global CSS file where Tailwind is initialized
import '../src/styles/globals.css'; 

const preview: Preview = {
  parameters: {
    // 1. Controls configuration (how props are displayed in the Storybook UI)
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 2. Global background/theme settings (optional)
    backgrounds: {
        values: [
            { name: 'light', value: '#ffffff' },
            { name: 'neutral', value: '#fafafa' }, // Use neutral-50 from tailwind config
        ],
    },
    // 3. Viewport settings for responsive testing (important for mobile view story)
    viewport: {
        viewports: {
            // Standard small device size
            mobile: {
                name: 'Mobile (375px)',
                styles: {
                    width: '375px',
                    height: '667px',
                },
            },
            // Standard large monitor size
            desktop: {
                name: 'Desktop (1440px)',
                styles: {
                    width: '1440px',
                    height: '900px',
                },
            },
        },
    },
  },
};

export default preview;