import { Connection, Model } from "mongoose";
import { ChatSchema } from "./schemas/chat.schema";

export const chatProviders = [
    {
        provide: 'CHAT_MODEL',
        useFactory: (connection: Connection): Model<any> => connection.model('Chat', ChatSchema),
        inject: ['DATABASE_CONNECTION']
    }
]