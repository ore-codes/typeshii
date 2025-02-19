import { StoryObj } from '@storybook/react';

import CompleteGame from '@/components/CompleteGame/CompleteGame';

export default {
  component: CompleteGame,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    leaderboard: {
      control: { type: 'array' },
    },
    userPlayerId: {
      control: { type: 'text' },
    },
    gameTime: {
      control: { type: 'number' },
    },
    onNewGame: { action: 'new game started' },
  },
};

type Story = StoryObj<typeof CompleteGame>;

export const Default: Story = {
  args: {
    leaderboard: [
      {
        id: 'player1',
        progress: 10,
        speed: 80,
        typedText: 'Hello world',
        paragraph: 'This is a test.',
        score: 100,
      },
      {
        id: 'player2',
        progress: 8.5,
        speed: 75,
        typedText: 'Hello world',
        paragraph: 'This is a test.',
        score: 95,
      },
      {
        id: 'player3',
        progress: 7.2,
        speed: 70,
        typedText: 'Hello world',
        paragraph: 'This is a test.',
        score: 90,
      },
    ],
    userPlayerId: 'player1',
    gameTime: 3600000, // 1 hour
  },
};

export const DifferentLeaderboard: Story = {
  args: {
    leaderboard: [
      {
        id: 'player4',
        progress: 15.3,
        speed: 90,
        typedText: 'Fast typing!',
        paragraph: 'Race against time.',
        score: 150,
      },
      {
        id: 'player1',
        progress: 12.7,
        speed: 85,
        typedText: 'Fast typing!',
        paragraph: 'Race against time.',
        score: 140,
      },
      {
        id: 'player5',
        progress: 11.1,
        speed: 82,
        typedText: 'Fast typing!',
        paragraph: 'Race against time.',
        score: 130,
      },
    ],
    userPlayerId: 'player1',
    gameTime: 4500000, // 1 hour 15 minutes
  },
};

export const ShortGame: Story = {
  args: {
    leaderboard: [
      {
        id: 'player6',
        progress: 5.1,
        speed: 60,
        typedText: 'Short test',
        paragraph: 'Quick race.',
        score: 50,
      },
      {
        id: 'player7',
        progress: 4.8,
        speed: 58,
        typedText: 'Short test',
        paragraph: 'Quick race.',
        score: 48,
      },
      {
        id: 'player1',
        progress: 4.3,
        speed: 55,
        typedText: 'Short test',
        paragraph: 'Quick race.',
        score: 47,
      },
    ],
    userPlayerId: 'player1',
    gameTime: 1200000, // 20 minutes
  },
};
