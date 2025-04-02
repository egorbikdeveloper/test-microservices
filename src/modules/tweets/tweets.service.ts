import { Inject, Injectable } from '@nestjs/common';
import { Tweet, User } from '@prisma/client';
import { TweetsRepository } from './tweets.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TweetsService {
  constructor(
    private repository: TweetsRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async createTweet(params: { content: Tweet[`content`]; userId: User[`id`] }) {
    const { content, userId } = params;

    // call repository layer
    const tweet = await this.repository.createTweet({
      data: {
        content,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // do other things in the service layer... e.g. send email of tweet

    return tweet;
  }

  async getTweets() {
    const cachedData = await this.cacheService.get<{ name: string }>('tweets');
    if    (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData; 
    }

    // if not, call API and set the cache:
    const tweets = await this.repository.getTweets({});
    await this.cacheService.set('tweets', tweets);

    return tweets;
  }
}