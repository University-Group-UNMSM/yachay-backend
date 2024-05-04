import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserType = 'student' | 'teacher';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: ['student', 'teacher'],
    default: 'student',
  })
  type: UserType;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 64 })
  password: string;
}
