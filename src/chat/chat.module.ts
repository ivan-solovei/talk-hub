import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseModule } from '../database/database.module';
import { chatProviders } from './chat.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ChatService,
    ...chatProviders,
  ],
  controllers: [ChatController]
})
export class ChatModule {}
