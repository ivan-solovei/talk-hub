import { Injectable } from '@nestjs/common';
import { ITransport } from '../transport/interfaces/transport.interfaces'
import { INewSource } from './interfaces'
import { News } from './News'
import { TransportController } from '../transport/transport.controller'

@Injectable()
export class BingNewsProvider implements INewSource {
    private url = ''
    private params = ''
    transport: ITransport
    constructor(
        transport: ITransport,
        readonly transportController: TransportController
    ) {
      this.transport = transport
    }

    public async getNewsByTopic(topic: string): Promise<News> {
        // TransportController.
        return await this.transportController.getResponse(this.url, this.params);
       
    }
  }