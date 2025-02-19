import { StoryObj } from '@storybook/react';

import IdleGame from '@/components/IdleGame/IdleGame';

export default {
  component: IdleGame,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onCreate: { action: 'new game created' },
    onInputKeyPress: { action: 'key pressed in input' },
  },
};

type Story = StoryObj<typeof IdleGame>;

export const Default: Story = {
  args: {
    onCreate: () => {},
    onInputKeyPress: () => {},
  },
};

export const WithActions: Story = {
  args: {
    onCreate: () => alert('New game created!'),
    onInputKeyPress: (e) => {
      if (e.key === 'Enter') {
        alert('Game ID entered: ' + (e.target as HTMLInputElement).value);
      }
    },
  },
};
