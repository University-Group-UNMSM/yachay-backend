import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NewCourseEvent } from './events/new.course.event';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(payload: Course): Promise<Course> {
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

    const newCourse = this.coursesRepository.create(course);

    this.eventEmitter.emit(
      'course.created',
      new NewCourseEvent({
        idTeacher: newCourse.idTeacher,
        name: newCourse.name,
      }),
    );

    return newCourse;
  }

  findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findById(id: number): Promise<Course | null> {
    return this.coursesRepository.findOne({
      where: { id },
    });
  }

  update(id: number, payload: Course): Promise<Course> {
    return this.coursesRepository.save({
      id,
      ...payload,
    });
  }

  async delete(id: number): Promise<Course> {
    const course = await this.findById(id);

    return this.coursesRepository.remove(course);
  }
}
