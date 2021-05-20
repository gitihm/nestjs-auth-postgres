import { Sequelize } from 'sequelize-typescript';
import { Address } from 'src/address/entity/address.entity';
import { User } from 'src/user/entity/user.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'postgres',
      });
      sequelize.addModels([User,Address]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
