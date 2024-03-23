import { Connection, Model } from "mongoose";
import { UserSchema } from "./schemas/user.schema";

export const usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection): Model<any> => connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION']
    }
]