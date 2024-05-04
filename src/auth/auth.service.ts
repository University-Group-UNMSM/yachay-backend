import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash } from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(type: 'student' | 'teacher', name: string, lastName: string, email: string, pass: string) {
    const hashedPassword = await hash(pass, jwtConstants.saltOrRounds);
    const user = await this.usersService.create(type, name, lastName, email, hashedPassword);

    const { password, ...result } = user;

    return result;
  }
}
