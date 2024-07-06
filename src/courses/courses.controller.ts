import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { OnlyTeachersGuard } from 'src/auth/only-teachers.guard';
import { OnlyTeachers } from 'src/shared/decorators/only-teachers.decorator';
import { UserId } from 'src/shared/decorators/user.decorator';

@Controller('courses')
@UseGuards(OnlyTeachersGuard)
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @OnlyTeachers()
  create(@UserId() userId: number, @Body() createCourseDto: Course) {
    return this.coursesService.create({ ...createCourseDto, idTeacher: userId });
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.coursesService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @OnlyTeachers()
  update(@Param('id') id: number, @Body() updateCourseDto: Course) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @OnlyTeachers()
  delete(@Param('id') id: number) {
    return this.coursesService.delete(id);
  }
}
