import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { IUser } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Req() req, @Body() body, @Res() res) {
    try {
      const { username, password, name }: IUser = body;
      const hashPassword = await this.hash(password);

      const user = await this.userService.getByUsername(username);
      if (user) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'username conflict' });
      } else {
        const result = await this.userService.create({
          username,
          password: hashPassword,
          name,
        });
        return res.status(HttpStatus.OK).json(result);
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).json(error);
    }
  }

  @Post('login')
  async login(@Req() req, @Res() res) {
    return res.status(200).json({ message: 'login' });
  }

  async hash(password) {
    return bcrypt.hash(password, 10);
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
