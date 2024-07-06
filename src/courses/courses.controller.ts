import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createCourseDto: Course) {
    return this.coursesService.create(createCourseDto);
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
  @Post(':id')
  update(@Body() id: number, @Body() updateCourseDto: Course) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.coursesService.delete(id);
  }
}
