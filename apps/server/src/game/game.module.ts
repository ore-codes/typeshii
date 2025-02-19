import { Module } from '@nestjs/common';
import { RedisModule } from '@/redis/redis.module';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [RedisModule],
  providers: [GameGateway, GameService],
})
export class GameModule {}
