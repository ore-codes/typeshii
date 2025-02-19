import type { Preview } from '@storybook/react';
import '../src/index.css';
import { themes } from '@storybook/theming';
import '@fontsource/rubik-spray-paint';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
  tags: ['autodocs'],
};

export default preview;
