import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto){
    return await this.userService.signup(createUserDto)
  }
  
  @Post('signin')
  async signin(@Body() loginUserDto: LoginUserDto){
    return await this.userService.signin(loginUserDto)
  }

  @Get('activate/:activationLink')
  async activateLink(@Param() param) {
    await this.userService.activate(param.activationLink)
    return 'Your account activated'
  }
}
