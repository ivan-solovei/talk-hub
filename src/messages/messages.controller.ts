import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { Message } from './interfaces/message.interface';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async getAllMessagesByChatId(@Param('id') id: string)  {
    return this.messagesService.findAllMessages(id);
  }

  @Get('theme/:theme')
  async getNewsByTheme(@Param('theme') theme: string)  {
    return this.messagesService.findNewsByTheme(theme);
  }
}