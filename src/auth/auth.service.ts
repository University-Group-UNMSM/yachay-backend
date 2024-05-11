import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash } from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(props: User) {
    const hashedPassword = await hash(props.password, +process.env.JWT_SALTS_NUM);
    const user = await this.usersService.create({ ...props, password: hashedPassword });

    const { password, ...result } = user;

    return result;
  }
}
