import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { messagesProviders } from './messages.providers';
import { DatabaseModule } from '../database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { NewsProvider } from '../NewsProvider'

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    ...messagesProviders,
    NewsProvider,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class MessagesModule {}