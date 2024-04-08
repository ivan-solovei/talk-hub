import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    userName: string,
    password: string,
  ): Promise<{ userId: string, access_token: string }> {

    const user = await this.findUser(userName);
    
    if(!user) {
      throw new HttpException(`Can't find User with current name: ${userName}`, HttpStatus.NOT_FOUND);  
    }
    if (user?.password !== password) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    const payload = { sub: user.userId, userName: user.userName };
    return {
      userId: user._id.toString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    userName: string,
    email: string,
    password: string,
  ): Promise<{ user, access_token: string }> {    
    const userNickName = await this.findUser(userName);
    if(!!userNickName) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const user = await this.createNewUser(userName, email, password)

    if(!user) {
      throw new HttpException(`Can't create User with current name: ${userName}`, HttpStatus.BAD_REQUEST);  
    }

    const payload = { sub: user.userId, userName: user.userName };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findUser(userName) {
    try {
      return await this.usersService.findOne(userName)      
    } catch (error) {
      this.logger.log(`Ooops, can't find user: ${userName} in DB`)
    }
  }

  async createNewUser(userName, email, password) {
    try {
      return await this.usersService.create({
        userName: userName,
        email: email,
        password: password,
    });
    } catch (error) {
      this.logger.log(`Ooops, can't create user: ${userName} in DB`)
    }
  }
}