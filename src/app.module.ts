import { Module } from '@nestjs/common';
import { TweetsModule } from './modules/tweets/tweets.module';
import { ApiModule } from './api/api.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    TweetsModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
