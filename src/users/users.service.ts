import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  create(type: 'student' | 'teacher', name: string, lastName: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.lastName = lastName;
    user.password = password;
    user.type = type;
    user.email = email;

    return this.usersRepository.save(user);
  }
}
