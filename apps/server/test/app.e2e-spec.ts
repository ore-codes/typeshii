import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as socketIo from 'socket.io';
import * as socketIoClient from 'socket.io-client';
import { GameService } from '@/game/game.service';
import { GameGateway } from '@/game/game.gateway';
import { GameEvents } from '@/game/game.types';

const SERVER_URL = 'http://localhost:3000';

describe('GameGateway (e2e)', () => {
  let app: INestApplication;
  let server: socketIo.Server;
  let clientSocket: socketIoClient.Socket;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [GameGateway, GameService],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer() as unknown as socketIo.Server;
    await app.init();
  });

  it('should create a game and join with player', (done) => {
    clientSocket = socketIoClient.connect(SERVER_URL, {
      transports: ['websocket'],
    });

    clientSocket.on('connect', () => {
      clientSocket.emit('createGame', 'player-1', (gameId: string) => {
        expect(gameId).toBeDefined();
        clientSocket.emit('joinGame', { playerId: 'player-1', gameId }, (response: any) => {
          expect(response.gameId).toBe(gameId);
          done();
        });
      });
    });
  });

  it('should update player progress and emit game state', (done) => {
    const gameId = 'game-1234';
    const playerId = 'player-1';

    clientSocket = socketIoClient.connect(SERVER_URL, {
      transports: ['websocket'],
    });

    clientSocket.on('connect', () => {
      clientSocket.emit('joinGame', { playerId, gameId }, (response: any) => {
        expect(response.gameId).toBe(gameId);

        clientSocket.on(GameEvents.GAME_STATE_UPDATED, (gameState) => {
          expect(gameState).toBeDefined();
          expect(gameState.players).toHaveLength(1);
          done();
        });

        clientSocket.emit('updateProgress', { playerId, typedText: 'hello' });
      });
    });
  });

  it('should handle player leave and emit player left event', (done) => {
    const gameId = 'game-1234';
    const playerId = 'player-1';

    clientSocket = socketIoClient.connect(SERVER_URL, {
      transports: ['websocket'],
    });

    clientSocket.on('connect', () => {
      clientSocket.emit('joinGame', { playerId, gameId }, (response: any) => {
        expect(response.gameId).toBe(gameId);

        clientSocket.on(GameEvents.PLAYER_LEFT, (data) => {
          expect(data.playerId).toBe(playerId);
          done();
        });

        // Simulate player leaving
        clientSocket.emit('leaveGame', playerId);
      });
    });
  });

  afterEach(() => {
    if (clientSocket) clientSocket.disconnect();
    if (server) server.close();
  });
});
