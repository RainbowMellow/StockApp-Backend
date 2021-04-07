import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://root:rootpassword@localhost', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'stocks',
      }),
  },
];
