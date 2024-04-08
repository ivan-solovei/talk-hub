import { Injectable } from '@nestjs/common';
import { BingNewsProvider } from './AiProviders/BingNewsProvider'
import { News } from './AiProviders/News';

@Injectable()
export class NewsProvider {
  constructor(private readonly bingNewsProvider: BingNewsProvider) {}

    async detectAiProvider(newsTopic: string): Promise<News> {
      //if newsTopic=== smth => bing
      return await this.bingNewsProvider.getNewsByTopic(newsTopic);
  };
}