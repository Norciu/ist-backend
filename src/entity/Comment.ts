import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from './Location';
import { User } from './User';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt!: Date;

  @ManyToOne(() => Location, location => location.comment)
  location!: Location | number;

  @ManyToOne(() => User, user => user.comment)
  user!: User | number;

}
