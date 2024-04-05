import { Model } from "mongoose";
import { Injectable, Inject, Optional } from "@nestjs/common";
import { Message } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { NewsProvider } from '../NewsProvider';

@Injectable()
export class MessagesService {
    constructor(
        @Inject('MESSAGE_MODEL')
        private readonly messageModel: Model<Message>,
        private readonly newsProvider: NewsProvider
        // @Optional() @Inject() private readonly newsProvider: NewsProvider
        // constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}

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
        console.log( '===',this.newsProvider );
        
        return await this.newsProvider.detectAiProvider(theme);

//         var subscriptionKey = 'dee8bd1fe4b24d18a2d980251ff1bfce';
//         var customConfigId = '55f71e3d-69b7-4f04-89a2-f56543034ba2';
//         var searchTerm = theme;
// console.log(theme);

//         var info = {
//         url: 'https://api.bing.microsoft.com/v7.0/custom/search?' + 
//             'q=' + searchTerm + "&" +
//             'customconfig=' + customConfigId + "&" +
//             'mkt=en-US',
//         headers: {
//             'Ocp-Apim-Subscription-Key' : subscriptionKey
//         }
//         }
//         console.log(info.url);
        
//     const response: any = 
//         axios.get(info.url, {  headers: {
//         'Ocp-Apim-Subscription-Key' : subscriptionKey
//         }}).then(response => {
//         console.log(response.data.webPages.value);
//         })

//     return response;
    }



}