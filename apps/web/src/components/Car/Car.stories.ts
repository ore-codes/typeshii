import { StoryObj } from '@storybook/react';

import Car from '@/components/Car/Car';

export default {
  component: Car,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    row: {
      options: [0, 1],
      control: { type: 'select' },
    },
    col: {
      options: [0, 1, 2],
      control: { type: 'select' },
    },
    isUser: {
      control: { type: 'boolean' },
    },
  },
};

type Story = StoryObj<typeof Car>;

export const Default: Story = {
  args: {
    row: 0,
    col: 0,
    isUser: false,
  },
};

export const UserCar: Story = {
  args: {
    row: 1,
    col: 2,
    isUser: true,
  },
};

export const OtherCar: Story = {
  args: {
    row: 0,
    col: 2,
    isUser: false,
  },
};
