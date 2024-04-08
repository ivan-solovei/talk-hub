import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { messagesProviders } from './messages.providers';
import { DatabaseModule } from '../database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { NewsProvider } from '../NewsProvider'
import { BingNewsProvider } from '../AiProviders/BingNewsProvider';
import { TransportController } from '../transport/transport.controller';
import { TransportService } from 'src/transport/transport.service';
import { TransportModule } from '../transport/transport.module';

@Module({
  imports: [DatabaseModule, TransportModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    ...messagesProviders,
    NewsProvider,
    BingNewsProvider,
    TransportController,
    TransportService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class MessagesModule {}