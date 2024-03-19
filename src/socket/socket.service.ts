import { WebSocketServer, ConnectedSocket, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*'
  },
})

export class SocketService implements OnGatewayConnection {
  @WebSocketServer() server: Server
  
  @SubscribeMessage('server-path')
  handleEvent(dto: any, @ConnectedSocket() client: Socket): void {
    console.log(dto);
    const res = {type: 'someType', dto};
    client.emit("client-path", res);
  }

  handleConnection(client: any): void {
    console.log(client);
    console.log("CONNECTED");
    console.log(`Client connected: ${client.id}`);
  }

}