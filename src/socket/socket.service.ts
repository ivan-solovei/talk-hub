import { WebSocketServer, SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket, OnGatewayConnection } from '@nestjs/websockets';
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
  handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    console.log(data);
    console.log(client.id);
    this.server.emit(
      'message', 
      {
        text: data.text,
        sender: client.id,
        timestamp: data.timestamp
      }
    );
  }
}