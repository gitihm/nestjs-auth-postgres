import { Sequelize } from 'sequelize-typescript'
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
      })
      sequelize.addModels([])
      await sequelize.sync()
      return sequelize
    },
  },
]
