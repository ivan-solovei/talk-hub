import { Model } from "mongoose";
import { Injectable, Inject, Logger } from "@nestjs/common";
import { Chat } from './interfaces/chat.interface';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

    constructor(
        @Inject('CHAT_MODEL')
        private readonly chatModel: Model<Chat>,
    ) {}

    async create(createChatDto: CreateChatDto): Promise<Chat> {
      try {
        return new this.chatModel(createChatDto)
          .save();
      } catch (error) {
        this.logger.log('Unable to create chats', error)
      }
    }

    async findAll(): Promise<Chat[]> {
      try {
        return this.chatModel
          .find()
          .exec()
      } catch (error) {
        this.logger.log('Unable to find all chats', error)
      }
    }

    async findAllByIds(ids: string[]): Promise<Chat[]> {
      try {
        return await this.chatModel
          .find({ _id: { $in: ids } })
          .exec()
      } catch (error) {
        this.logger.log('Unable to get chats', error)
      }
    }
}
