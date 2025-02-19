import { StoryObj } from '@storybook/react';

import WaitingGame from '@/components/WaitingGame/WaitingGame';

export default {
  component: WaitingGame,
  parameters: {
    layout: 'centered',
  },
};

type Story = StoryObj<typeof WaitingGame>;

export const Default: Story = {};
