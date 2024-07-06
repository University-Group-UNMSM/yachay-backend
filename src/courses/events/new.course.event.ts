export class NewCourseEvent {
  idTeacher: number;
  name: string;
  idCourse: number;

  constructor(payload: { idTeacher: number; name: string; idCourse: number }) {
    this.idTeacher = payload.idTeacher;
    this.name = payload.name;
    this.idCourse = payload.idCourse;
  }
}
