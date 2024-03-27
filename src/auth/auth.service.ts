import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    console.log(user);
    
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
    pass: string,
    email: string,
    // pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.create({
        // userId: '10',
        userName: userName,
        password: pass,
        // name: 'changeme',
        // surname: 'changeme',
        email: email,
    })
    console.log(user);
    
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}