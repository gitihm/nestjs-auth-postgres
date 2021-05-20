import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Address } from 'src/address/entity/address.entity';
import { IUser, User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  //address.controller.ts
  @Post('address')
  async createAddress(@Body() body, @Res() res) {
    try {
      const result = await this.userService.createAddress(body);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.BAD_GATEWAY).json(error);
    }
  }

  @Get('address/:id')
  async getAddress(@Param('id') id , @Res() res){
    try {
      const options = {
        where:{
          id : id
        },
        include:[
          {
            model : User,
          }
        ]
      }
      const result = await this.userService.getsAddress(options)
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.BAD_GATEWAY).json(error);
    }
  }


  //user
  @Get('user/:id')
  async getUser(@Param('id') id , @Res() res){
    try {
      const options = {
        where:{
          id : id
        },
        include:[
          {
            model : Address,
            as : 'address'
          }
        ]
      }
      const result = await this.userService.get(options)
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res.status(HttpStatus.BAD_GATEWAY).json(error);
    }
  }
}
