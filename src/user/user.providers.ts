import { Address } from 'src/address/entity/address.entity'
import { User } from './entity/user.entity'

export const Repositories = {
  UserRepository: 'UsersRepository',
  AddressRepository :'AddressRepository'
}



export const UserProvider = [
  {
    provide: Repositories.UserRepository,
    useValue: User,
  },

  //address
  {
    provide: Repositories.AddressRepository,
    useValue: Address,
  },
  
]
