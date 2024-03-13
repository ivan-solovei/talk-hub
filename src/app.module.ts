import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { productModule } from './products/product.module';
import { SocketController } from './sockets/socket.controller';

@Module({
  imports: [productModule],
  controllers: [AppController, SocketController],
  providers: [AppService],
})
export class AppModule {}
