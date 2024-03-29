import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    userName: string,
    password: string,
  ): Promise<{ userId: string, access_token: string }> {
    const user: any = await this.usersService.findOne(userName);
    if (user?.password !== password) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
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
    const userNickName = await this.usersService.findOne(userName);
    if(!!userNickName) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.create({
        userName: userName,
        email: email,
        password: password,
    })

    const payload = { sub: user.userId, userName: user.userName };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}