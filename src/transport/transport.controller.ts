import { Controller } from '@nestjs/common';
import { TransportService } from './transport.service';
import { News } from "../AiProviders/News";

@Controller()
export class TransportController {
  constructor(private readonly transportService: TransportService) {}
}