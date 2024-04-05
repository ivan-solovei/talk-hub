import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { logger } from "./common/middleware/logger.middleware";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { TransportModule } from './transport/transport.module';

@Module({
  imports: [SocketModule, MessagesModule, UsersModule, AuthModule, ChatModule, TransportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes({ path: 'messages', method: RequestMethod.OPTIONS });
  }
}
