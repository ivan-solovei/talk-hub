import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { messagesProviders } from './messages.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    ...messagesProviders,
  ],
})
export class MessagesModule {}