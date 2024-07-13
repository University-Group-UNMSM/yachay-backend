import { UserId } from 'src/shared/decorators/user.decorator';
import { UsersService } from './users.service';
import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put()
  update(@UserId() userId: number, @Body() updateUserDto: Partial<User>) {
    return this.usersService.update(userId, updateUserDto);
  }
}
