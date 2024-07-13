import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NewCourseEvent } from './events/new.course.event';
import { CourseUpdatedEvent } from './events/course.updated.event';
import { EVENTS } from 'src/shared/enums/events';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(payload: Course): Promise<any> {
    const course = new Course();
    course.idTeacher = payload.idTeacher;
    course.name = payload.name;
    course.banner = payload.banner;
    course.category = payload.category;
    course.description = payload.description;
    course.resume = payload.resume;
    course.language = payload.language;
    course.filesCount = payload.filesCount;
    course.rating = payload.rating;
    course.price = payload.price;
    course.discount = payload.discount;
    course.benefits = payload.benefits;
    course.targetPublic = payload.targetPublic;
    course.description = payload.description;

    const newCourse = await this.coursesRepository.save(course);

    this.eventEmitter.emit(
      EVENTS.COURSE_CREATED,
      new NewCourseEvent({
        idTeacher: newCourse.idTeacher,
        name: newCourse.name,
        idCourse: newCourse.id,
      }),
    );

    const teacher = await this.usersService.findById(newCourse.idTeacher);

    return {
      ...newCourse,
      teacher,
    };
  }

  async findAll(): Promise<any[]> {
    const courses = await this.coursesRepository.find();
    const coursesWithTeacherInformation = [];

    for (const course of courses) {
      const teacher = await this.usersService.findById(course.idTeacher);

      coursesWithTeacherInformation.push({
        ...course,
        teacher,
      });
    }

    return coursesWithTeacherInformation;
  }

  findById(id: number): Promise<Course | null> {
    return this.coursesRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, payload: Course): Promise<Course> {
    const updatedCourse = await this.coursesRepository.save({
      id,
      ...payload,
    });

    this.eventEmitter.emit(
      EVENTS.COURSE_UPDATED,
      new CourseUpdatedEvent({
        idTeacher: updatedCourse.idTeacher,
        name: updatedCourse.name,
        idCourse: updatedCourse.id,
      }),
    );

    return updatedCourse;
  }

  async delete(id: number): Promise<Course> {
    const course = await this.findById(id);

    return this.coursesRepository.remove(course);
  }
}
