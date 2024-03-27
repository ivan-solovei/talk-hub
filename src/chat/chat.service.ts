import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { Chat } from './interfaces/chat.interface';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
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

    async findAllChats(id: string) {
        const foundedChat = await this.chatModel
        .findById({_id: id})
        .exec()
        return foundedChat
    }
}
