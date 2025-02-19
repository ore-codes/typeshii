import { Module } from '@nestjs/common';
import { GameModule } from '@/game/game.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
