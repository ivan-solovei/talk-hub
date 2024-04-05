import { Controller } from '@nestjs/common';
import { TransportService } from './transport.service';
import { News } from "../AiProviders/News";

@Controller()
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  async getResponse(url: string, params: any): Promise<News> {
    return await this.transportService.call(url, params);
  }
}