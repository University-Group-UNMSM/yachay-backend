import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'cursos',
})
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  idTeacher: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  banner: string;

  @Column('varchar', { nullable: false })
  category: string;

  @Column()
  resume: string;

  @Column()
  language: string;

  @Column()
  filesCount: string;

  @Column()
  rating: number;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column()
  benefits: string;

  @Column()
  targetPublic: string;

  @Column()
  description: string;
}
