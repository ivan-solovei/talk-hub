import * as mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://solo:reqwow88@talk-hub-cluster.pw9tlim.mongodb.net/?retryWrites=true&w=majority&appName=talk-hub-cluster";

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      })
  },
];