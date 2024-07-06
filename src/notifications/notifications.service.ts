import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { NewCourseEvent } from 'src/courses/events/new.course.event';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { EVENTS } from 'src/shared/enums/events';
import { CourseUpdatedEvent } from 'src/courses/events/course.updated.event';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    private usersService: UsersService,
  ) {}

  @OnEvent(EVENTS.COURSE_CREATED)
  async handleNewCourseCreatedEvent(payload: NewCourseEvent) {
    const students = await this.usersService.findAll({
      where: { type: 'student' },
    });
    const teacher = await this.usersService.findById(payload.idTeacher);
    const message = `**${teacher.name} ${teacher.lastName}** ha agregado un nuevo curso: **${payload.name}**`;

    for (const student of students) {
      const notification = new Notification();
      notification.idUser = student.id;
      notification.message = message;
      notification.read = false;
      notification.type = 'info';
      notification.url = `/courses/${payload.idCourse}`;

      await this.notificationsRepository.save(notification);
    }
  }

  @OnEvent(EVENTS.COURSE_UPDATED)
  async handleCourseUpdatedEvent(payload: CourseUpdatedEvent) {
    const students = await this.usersService.findAll({
      where: { type: 'student' },
    });
    const teacher = await this.usersService.findById(payload.idTeacher);
    const message = `**${teacher.name} ${teacher.lastName}** ha actualizado el curso: **${payload.name}**`;

    for (const student of students) {
      const notification = new Notification();
      notification.idUser = student.id;
      notification.message = message;
      notification.read = false;
      notification.type = 'info';
      notification.url = `/courses/${payload.idCourse}`;

      await this.notificationsRepository.save(notification);
    }
  }

  findAll() {
    return this.notificationsRepository.find();
  }

  findByUser(idUser: number) {
    return this.notificationsRepository.find({
      where: { idUser },
    });
  }

  markAsRead(id: number) {
    return this.notificationsRepository.update(id, { read: true });
  }
}
