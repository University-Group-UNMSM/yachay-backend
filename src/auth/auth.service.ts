import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(props: User) {
    const hashedPassword = await hash(props.password, +process.env.JWT_SALTS_NUM);
    const user = await this.usersService.create({ ...props, password: hashedPassword });

    const { password, ...result } = user;

    return result;
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string} > {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = await compare(pass, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
