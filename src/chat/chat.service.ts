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
        const createdChat = new this.chatModel(createChatDto);
        return createdChat.save();
    }

    async findAll(): Promise<Chat[]> {
        return this.chatModel.find().exec();
    }

    async findAllByIds(ids: string[]): Promise<Chat[]> {
          try {
            return await this.chatModel
            .find({ _id: { $in: ids } })
            .exec()
          } catch (error) {
            this.logger.log('Unable to get chats')
          }
      }
}
