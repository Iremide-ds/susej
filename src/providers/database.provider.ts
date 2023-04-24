import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'tester',
        password: '',
        database: 'sussej',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
