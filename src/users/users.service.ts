import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      name: 'john',
      lastName: 'Doe',
      type: 'student',
      email: 'jhondoe@gmail.com',
      createdAt: new Date(),
      password: 'alsjhdajklsdhad',
    },
    {
      userId: 2,
      name: 'maria',
      lastName: 'Doe',
      type: 'teacher',
      email: 'mariadoe@gmail.com',
      createdAt: new Date(),
      password: 'o8ausd09a8sd9jk',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(type: 'student' | 'teacher', name: string, lastName: string, email: string, password: string) {
    const user = {
      userId: this.users.length + 1,
      name,
      lastName,
      type,
      email,
      createdAt: new Date(),
      password,
    };

    this.users.push(user);

    return user;
  }
}
