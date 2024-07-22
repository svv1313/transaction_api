import { User } from 'src/users/users.entity';
import { DataSource } from 'typeorm';

export const authProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
