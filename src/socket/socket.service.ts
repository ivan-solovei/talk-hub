import { WebSocketServer, SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket']
})

export class SocketService {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: object, @ConnectedSocket() client: Socket): void {
    console.log(data);
    console.log(client);
    this.server.emit('message', data);
  }
}