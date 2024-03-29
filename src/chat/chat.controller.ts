import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';
import { Chat } from './interfaces/chat.interface';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}
  
    @Post()
    async create(@Body() createMessageDto: CreateChatDto) {
      return this.chatService.create(createMessageDto);
    }

    @Post()
    async attachMessageId(@Body() createMessageDto: CreateChatDto) {
      return this.chatService.create(createMessageDto);
    }
  
    @Get()
    async findAll(): Promise<Chat[]> {
      return this.chatService.findAll();
    }

    @Get(':ids')
    async findAllChats(@Param('ids') ids: string): Promise<any> {
      const idsArray = ids.split(',');
      return this.chatService.findAllChats(idsArray);
    }
}