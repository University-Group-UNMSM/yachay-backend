import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  create(payload: User): Promise<User> {
    const user = new User();
    user.name = payload.name;
    user.lastName = payload.lastName;
    user.password = payload.password;
    user.type = payload.type;
    user.email = payload.email;
    user.phone = payload.phone;
    user.secondEmail = payload.secondEmail;
    user.profilePicture = payload.profilePicture;
    user.college = payload.college;

    return this.usersRepository.save(user);
  }

  findAll(options?: FindManyOptions): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
