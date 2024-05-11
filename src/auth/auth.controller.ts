import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { Public } from 'src/shared/decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  signUp(@Body() signUpDto: User) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() sigInDto: { email: string, pass: string }) {
    return this.authService.signIn(sigInDto.email, sigInDto.pass);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  me(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
