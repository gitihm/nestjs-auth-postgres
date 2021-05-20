import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {UserProvider} from './user.providers'
import { UserController } from './user.controller';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService , ...UserProvider],
  exports:[UserService]
})
export class UserModule {}
