import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NewCourseEvent } from 'src/courses/events/new.course.event';

@Injectable()
export class NotificationsService {
  @OnEvent('course.created')
  async handleNewCourseCreatedEvent(payload: NewCourseEvent) {
    console.log('New course created:', payload);
  }
}
