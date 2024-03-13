import { Controller } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Controller()
@WebSocketGateway()
export class SocketController implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
    
    // Відправка повідомлення кожні 10 секунд
    setInterval(() => {
      this.server.emit('message', 'Hello from server!');
    }, 10000);
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log('Received message from client:', payload);

    // Відправка повідомлення всім підключеним клієнтам, крім відправника
    client.broadcast.emit('message', payload);
  }
}
