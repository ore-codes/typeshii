import { StoryObj } from '@storybook/react';

import Character from '@/components/Character/Character';

export default {
  component: Character,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    state: {
      options: ['DEFAULT', 'CORRECT', 'WRONG'],
      control: { type: 'select' },
    },
    char: {
      control: { type: 'text' },
    },
  },
};

type Story = StoryObj<typeof Character>;

export const DefaultState: Story = {
  args: {
    char: 'A',
    state: 'DEFAULT',
  },
};

export const CorrectState: Story = {
  args: {
    char: 'B',
    state: 'CORRECT',
  },
};

export const WrongState: Story = {
  args: {
    char: 'C',
    state: 'WRONG',
  },
};
