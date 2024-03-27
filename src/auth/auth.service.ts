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
    pass: string,
  ): Promise<{ userId: string, access_token: string }> {
    const user = await this.usersService.findOne(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, userName: user.userName };
    return {
      userId: user.userId,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    userName: string,
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {    
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
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}