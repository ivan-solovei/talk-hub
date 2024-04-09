import { Injectable, Logger } from '@nestjs/common';
import { News } from './News'
import { TransportService } from '../transport/transport.service'

@Injectable()
export class BingNewsProvider {
    private readonly logger = new Logger(BingNewsProvider.name);
    private url = process.env.BING_URL
    private subscriptionKey = process.env.BING_SUBSCRIPTION_KEY;
    private customConfigId = process.env.BING_CUSTOM_CONFIG;

    constructor(
        private readonly transportService: TransportService
    ) {}

    private generateUrl(topic: string, url: string, customConfigId: string) {
      return url + 
        'q=' + topic + "&" +
        'customconfig=' + customConfigId + "&" +
        'mkt=en-US'
    }

    public async getNewsByTopic(topic: string): Promise<News> {
      const info = {
        url: this.generateUrl(topic, this.url, this.customConfigId),
        headers: {
            'Ocp-Apim-Subscription-Key' : this.subscriptionKey
        }
      }
      try {
        return await this.transportService.call(info.url, info.headers);
      } catch (error) {
        this.logger.log(`Ooops, can't find news by: ${topic}`)
      }
    }
  }