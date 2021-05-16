import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { IUser } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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
  async login(@Req() req, @Body() body, @Res() res) {
    try {
      const { username, password } = body;
      const user = await this.userService.getByUsername(username);
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'username not found' });
      }
      const status = await this.compare(password, user.password);
      if (status) {
        const token = await this.createToken(user);
        const {password , ...userwithoutpassword} = user
        return res.status(200).json({ token , user : userwithoutpassword });
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'username not found' });
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_GATEWAY).json(error);
    }
  }

  @Get('me')
  async me(@Req() req, @Res() res) {
    try {
      const result = await this.authorization(req);
      if (!result) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'token not found' });
      }
      const { password, ...user } = result;
      return res.status(HttpStatus.OK).json({ user });
    } catch (error) {
        return res.status(HttpStatus.BAD_GATEWAY).json(error);
    }
  }

  async hash(password) {
    return bcrypt.hash(password, 10);
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async createToken(data, exipration = undefined) {
    return jwt.sign(data, 'nzblsjdbflahbdslfjhbalsdjbflajhdsblfhasbdflhj');
  }

  async authorization(req): Promise<any> {
    const token = req.headers.authorization.replace('Bearer ', '');
    return jwt.verify(
      token,
      'nzblsjdbflahbdslfjhbalsdjbflajhdsblfhasbdflhj',
      (err, decoded) => decoded,
    );
  }
}
