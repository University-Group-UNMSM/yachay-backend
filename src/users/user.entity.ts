import { IsEmail, IsUrl, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserType = 'student' | 'teacher';

@Entity({
  name: 'usuarios',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  @Length(3, 50)
  name: string;

  @Column('varchar', { length: 50 })
  @Length(3, 50)
  lastName: string;

  @Column({
    type: 'enum',
    enum: ['student', 'teacher'],
    default: 'student',
  })
  type: UserType;

  @Column('varchar', { length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column('varchar', { length: 64 })
  password: string;

  @Column('varchar', { length: 10 })
  phone: string;

  @Column('varchar', { length: 100 })
  @IsEmail()
  secondEmail: string;

  @Column('varchar')
  college: string;

  @Column('varchar', {
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
  })
  @IsUrl()
  profilePicture: string;
}
