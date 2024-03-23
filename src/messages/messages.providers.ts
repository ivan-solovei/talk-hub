import { Connection, Model } from "mongoose";
import { MessageSchema } from "./schemas/message.schema";

export const messagesProviders = [
    {
        provide: 'MESSAGE_MODEL',
        useFactory: (connection: Connection): Model<any> => connection.model('Message', MessageSchema),
        inject: ['DATABASE_CONNECTION']
    }
]