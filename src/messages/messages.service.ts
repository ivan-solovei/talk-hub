import { Model } from "mongoose";
import { Injectable, Inject, Optional, Logger } from "@nestjs/common";
import { Message } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { NewsProvider } from '../NewsProvider';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);
    constructor(
        private readonly newsProvider: NewsProvider,
        @Inject('MESSAGE_MODEL')
        private readonly messageModel: Model<Message>,
    ) {}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
      try {
        return new this.messageModel(createMessageDto)
          .save()
      } catch (error) {
        this.logger.log('Unable to create message', error)
      }
    }

    async findAll(): Promise<Message[]> {
      try {
        return this.messageModel
          .find()
          .exec()
      } catch (error) {
        this.logger.log('Unable to find all messages', error)
      }
    }

    async findAllMessages(id: string): Promise<any> {
      try {
        return await this.messageModel
          .find({ chatId: { $all: [id] } })
          .exec()
      } catch (error) {
        this.logger.log('Unable to find all messages by ChatId', error)
      }
    }

    async findNewsByTheme(theme: string): Promise<any> {
      try {
        return await this.newsProvider.detectAiProvider(theme)
      } catch (error) {
        this.logger.log(`Unable to find all news by theme: ${theme}`, error)
      }
    }
}