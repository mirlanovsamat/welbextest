import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { TokenEntity } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ){}

  generateJwt(user: UserEntity) {
    const accessToken = jwt.sign(
        {id: user.id, email: user.email, name: user.name, password: user.password},
        process.env.JWT_ACCESS_TOKEN,
        {expiresIn: '1h'}
    )
    const refreshToken = jwt.sign(
        {id: user.id, email: user.email, password: user.password},
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn: '30d'}
    )
    return { accessToken, refreshToken}
  }

  async saveToken(user, refreshToken) {
    const tokenData = await this.tokenRepository.findOne({user: user})
    if(tokenData) {
        tokenData.refreshToken = refreshToken
        return await this.tokenRepository.save(tokenData)
    }
    const token = await this.tokenRepository.save({user: user, refreshToken: refreshToken})
    return token
  }

}
