import { Injectable } from '@nestjs/common';
import axios from "axios";
import { ITransport } from "./interfaces/transport.interfaces";
import { News } from "../AiProviders/News";


@Injectable()
export class TransportService implements ITransport {
    async call(url: string, params: string): Promise<News> {
        return await axios.get(url, {params});
      }
}
