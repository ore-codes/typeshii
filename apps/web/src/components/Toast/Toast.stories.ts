import { StoryObj } from '@storybook/react';

import Toast from '@/components/Toast/Toast';

export default {
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
    },
    type: {
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'radio' },
    },
    duration: {
      control: { type: 'number' },
    },
    onClose: { action: 'closed' },
  },
};

type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    message: 'This is an informational toast',
    type: 'info',
    duration: 3000,
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    message: 'Action was successful!',
    type: 'success',
    duration: 3000,
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning message!',
    type: 'warning',
    duration: 3000,
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    message: 'Something went wrong!',
    type: 'error',
    duration: 3000,
    onClose: () => {},
  },
};

export const LongDuration: Story = {
  args: {
    message: 'This toast will last for 10 seconds',
    type: 'info',
    duration: 10000,
    onClose: () => {},
  },
};
