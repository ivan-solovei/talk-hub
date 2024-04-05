import { Injectable } from '@nestjs/common';
import { News } from './News'
import { TransportController } from '../transport/transport.controller'

@Injectable()
export class BingNewsProvider {
    private url = 'https://api.bing.microsoft.com/v7.0/custom/search?'
    private subscriptionKey = 'dee8bd1fe4b24d18a2d980251ff1bfce';
    private customConfigId = '55f71e3d-69b7-4f04-89a2-f56543034ba2';
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
        return await this.transportController.getResponse(info.url, info.headers);
    }
  }