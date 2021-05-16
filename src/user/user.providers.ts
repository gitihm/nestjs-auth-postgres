import { User } from './entity/user.entity'

export const UsersRepositories = {
  UserRepository: 'UsersRepository',
}

export const UserProvider = [
  {
    provide: UsersRepositories.UserRepository,
    useValue: User,
  },
  
]
