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

  @Column({
    nullable: true,
  })
  resume: string;

  @Column({
    nullable: true,
  })
  language: string;

  @Column({
    nullable: true,
  })
  filesCount: string;

  @Column({
    nullable: true,
  })
  rating: number;

  @Column({
    nullable: true,
  })
  price: number;

  @Column({
    nullable: true,
  })
  discount: number;

  @Column({
    nullable: true,
  })
  benefits: string;

  @Column({
    nullable: true,
  })
  targetPublic: string;

  @Column({
    nullable: true,
  })
  description: string;
}
