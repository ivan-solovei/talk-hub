import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { logger } from "./common/middleware/logger.middleware";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SocketModule, MessagesModule, UsersModule],
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
