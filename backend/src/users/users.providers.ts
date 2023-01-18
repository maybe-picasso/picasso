import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('Users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
