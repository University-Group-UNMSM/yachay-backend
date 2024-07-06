import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Public } from 'src/shared/decorators/public-route.decorator';
import { UserId } from 'src/shared/decorators/user.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  @Public()
  findAll() {
    return this.notificationsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findByUser(@UserId() userId: number) {
    return this.notificationsService.findByUser(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('mark-as-read')
  markAsRead(@Body() notificationId: number) {
    return this.notificationsService.markAsRead(notificationId);
  }
}
