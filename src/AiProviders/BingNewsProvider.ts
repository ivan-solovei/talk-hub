import { Injectable, Logger } from '@nestjs/common';
import { News } from './News'
import { TransportController } from '../transport/transport.controller'

@Injectable()
export class BingNewsProvider {
    private readonly logger = new Logger(BingNewsProvider.name);
    private url = process.env.BING_URL
    private subscriptionKey = process.env.BING_SUBSCRIPTION_KEY;
    private customConfigId = process.env.BING_CUSTOM_CONFIG;

    constructor(
        private readonly transportController: TransportController
    ) {}

    public async getNewsByTopic(topic: string): Promise<News> {
      const info = {
        url: this.url + 
        'q=' + topic + "&" +
        'customconfig=' + this.customConfigId + "&" +
        'mkt=en-US',
        headers: {
            'Ocp-Apim-Subscription-Key' : this.subscriptionKey
        }
      }
      try {
        return await this.transportController.getResponse(info.url, info.headers);
      } catch (error) {
        this.logger.log(`Ooops, can't find news by: ${topic}`)
      }
    }
  }