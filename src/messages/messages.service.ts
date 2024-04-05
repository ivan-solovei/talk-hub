import { Model } from "mongoose";
import { Injectable, Inject, Optional } from "@nestjs/common";
import { Message } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { NewsProvider } from '../NewsProvider';
import axios from "axios";

@Injectable()
export class MessagesService {
    constructor(
        private readonly newsProvider: NewsProvider,
        @Inject('MESSAGE_MODEL')
        private readonly messageModel: Model<Message>,
    ) {}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const createdMessage = new this.messageModel(createMessageDto);
        return createdMessage.save();
    }

    async findAll(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }

    async findAllMessages(id): Promise<any> {
        const findAll = await this.messageModel.find({ chatId: { $all: [id] } }).exec();
        return findAll;
    }

    async findNewsByTheme(theme): Promise<any> {
        return await this.newsProvider.detectAiProvider(theme);
    }
}