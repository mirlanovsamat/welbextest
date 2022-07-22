import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './../auth/auth.service';
import { MailService } from './../mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ){}

  async signup(createUserDto: CreateUserDto){
    const candidate = await this.userRepository.findOne({email: createUserDto.email});
    if(candidate){
        throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }
    const newUser = new UserEntity()
    newUser.activationLink = uuid.v4()
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    Object.assign(newUser, createUserDto);
    await this.mailService.sendUserConfirmation(createUserDto.email, `${process.env.API_URL}/user/activate/${newUser.activationLink}`)
    await this.userRepository.save(newUser);
    const tokens = this.authService.generateJwt(newUser);
    await this.authService.saveToken(newUser, tokens.refreshToken);
    return tokens
  }

  async signin(loginUserDto: LoginUserDto){
    const user = await this.userRepository.findOne({email: loginUserDto.email});
    if(!user){
        throw new HttpException('Пользователь с таким email не существует', HttpStatus.BAD_REQUEST)
    }
    const isPasswordCorrect = await bcrypt.compare(loginUserDto.password, user.password)
    if(!isPasswordCorrect){
        throw new HttpException('Неправильный пароль', HttpStatus.BAD_REQUEST)
    }
    const tokens = this.authService.generateJwt(user);
    await this.authService.saveToken(user.id, tokens.refreshToken);
    return tokens
  }

  async activate(activationLink) {
    const user = await this.userRepository.findOne({activationLink: activationLink})
    if(!user) {
        throw new HttpException('Ошибка', HttpStatus.BAD_REQUEST)
    }
    user.isActivated = true
    this.userRepository.save(user)
  } 

  async findById(id: string): Promise<UserEntity>{
    return await this.userRepository.findOne(id)
  }
}
