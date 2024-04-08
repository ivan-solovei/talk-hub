import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosHeaders } from "axios";
import { ITransport } from "./interfaces/transport.interfaces";
import { News } from "../AiProviders/News";


@Injectable()
export class TransportService implements ITransport {
  private readonly logger = new Logger(TransportService.name);
    async call(url: string, params: AxiosHeaders): Promise<News | any> {
        try {
          return await axios.get(url, { headers: params });
          } catch (error) {
            this.logger.log('Ooops, failed to get news', error)
          }
      }
}
