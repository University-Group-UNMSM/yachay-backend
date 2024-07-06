import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'notificaciones',
})
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  idUser: number;

  @Column('varchar', { nullable: false })
  type: string;

  @Column('varchar', { nullable: false })
  message: string;

  @Column('varchar', { nullable: false })
  url: string;

  @Column('boolean', { nullable: false })
  read: boolean;
}
