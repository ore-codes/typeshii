import { StoryObj } from '@storybook/react';

import Road from '@/components/Road/Road';

export default {
  component: Road,
  decorators: [
    (Story) => (
      <div className="relative h-96 w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    speed: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The speed of the road animation. Ranges from 0 (stationary) to 100 (fastest).',
    },
  },
};

type Story = StoryObj<typeof Road>;

export const Default: Story = {
  args: {
    speed: 0,
  },
};

export const Slow: Story = {
  args: {
    speed: 25,
  },
};

export const Medium: Story = {
  args: {
    speed: 50,
  },
};

export const Fast: Story = {
  args: {
    speed: 100,
  },
};
