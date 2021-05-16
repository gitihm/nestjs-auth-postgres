import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'nzblsjdbflahbdslfjhbalsdjbflajhdsblfhasbdflhj',
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
