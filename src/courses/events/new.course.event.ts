export class NewCourseEvent {
  idTeacher: number;
  name: string;

  constructor(payload: { idTeacher: number; name: string }) {
    this.idTeacher = payload.idTeacher;
    this.name = payload.name;
  }
}
