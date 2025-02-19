import { StoryObj } from '@storybook/react';

import PlayingGame from '@/components/PlayingGame/PlayingGame';

export default {
  component: PlayingGame,
  decorators: [
    (Story) => (
      <div className="relative flex h-96 w-full justify-center">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    players: {
      control: { type: 'array' },
    },
    userPlayerId: {
      control: { type: 'text' },
    },
  },
};

type Story = StoryObj<typeof PlayingGame>;

export const Default: Story = {
  args: {
    players: [
      { id: 'player1', relativePos: 100 },
      { id: 'player2', relativePos: 200 },
      { id: 'player3', relativePos: 300 },
      { id: 'player4', relativePos: 400 },
    ],
    userPlayerId: 'player1',
  },
};

export const DifferentPlayerPositions: Story = {
  args: {
    players: [
      { id: 'player1', relativePos: 800 },
      { id: 'player2', relativePos: 600 },
      { id: 'player3', relativePos: 300 },
      { id: 'player4', relativePos: 100 },
    ],
    userPlayerId: 'player3',
  },
};

export const SinglePlayer: Story = {
  args: {
    players: [{ id: 'player1', relativePos: 500 }],
    userPlayerId: 'player1',
  },
};
