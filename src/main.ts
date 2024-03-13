import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { AppModule } from './app.module';
import { ServerApiVersion } from 'mongodb';
var ip = require('ip');

// import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

async function bootstrap() {
  console.dir(ip.address());
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`Server started on port ${port}!`));

  const uri = "mongodb+srv://solo:reqwow88@talk-hub-cluster.pw9tlim.mongodb.net/?retryWrites=true&w=majority&appName=talk-hub-cluster";

  mongoose.connect(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  console.log("Connected to MongoDB!");

    // Визначаємо модель даних користувача
  class UserTest {
    @prop({ required: true })
    name!: string;

    @prop({ required: true, unique: true })
    email!: string;

    @prop({ required: true })
    password!: string;
  }

  // Створюємо модель з класу користувача
  const UserModel = getModelForClass(UserTest);

  try {
    // Приклад додавання користувача до бази даних
    const newUser = await UserModel.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    console.log('Created user:', newUser);

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    mongoose.disconnect()
      .then(() => {
        console.log('Disconnected from MongoDB');
      })
      .catch(error => {
        console.error('Error disconnecting from MongoDB:', error);
      });
  }
}


// @WebSocketGateway()
// export class SocketController implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

//   @WebSocketServer() server: Server;

//   afterInit(server: Server) {
//     console.log('WebSocket server initialized');
    
//     // Відправка повідомлення кожні 10 секунд
//     setInterval(() => {
//       this.server.emit('message', 'Hello from server!');
//     }, 10000);
//   }

//   handleConnection(client: Socket) {
//     console.log('Client connected:', client.id);
//   }

//   handleDisconnect(client: Socket) {
//     console.log('Client disconnected:', client.id);
//   }

//   @SubscribeMessage('message')
//   handleMessage(client: Socket, payload: any) {
//     console.log('Received message from client:', payload);

//     // Відправка повідомлення всім підключеним клієнтам, крім відправника
//     client.broadcast.emit('message', payload);
//   }



bootstrap();
