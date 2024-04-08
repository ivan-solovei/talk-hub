import { Injectable } from '@nestjs/common';
import axios, { AxiosHeaders } from "axios";
import { ITransport } from "./interfaces/transport.interfaces";
import { News } from "../AiProviders/News";


@Injectable()
export class TransportService implements ITransport {
    async call(url: string, params: AxiosHeaders): Promise<News | any> {
        let response: any;
        try {
            response = await axios.get(url, { headers: params });
          } catch (error) {
            console.error(error);
          }
        return response?.data?.webPages?.value;
      }
}
