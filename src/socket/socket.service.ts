import { WebSocketServer, SubscribeMessage, WebSocketGateway, MessageBody, ConnectedSocket, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { Logger, Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket']
})

@Injectable()
export class SocketService implements OnGatewayConnection {
  private readonly logger = new Logger(SocketService.name);
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    const clientId = client.id;
    client.emit('sid', clientId)
  }

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    this.logger.log(data);
    this.server.emit(
      'message', 
      {
        text: data.text,
        sender: data.sender,
        senderName: data.senderName,
        timestamp: data.timestamp
      }
    );
  }
}