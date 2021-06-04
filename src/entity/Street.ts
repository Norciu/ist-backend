import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City';
import { Location } from './Location';

@Entity()
export class Street {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'street_name',
    length: 50,
  })
  streetName!: string;

  @Column({
    nullable: false,
    length: 7,
  })
  ulic!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: number;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: number;

  @ManyToOne(() => City, (city) => city.streets, {
    nullable: false,
  })
  city!: City;

  @OneToMany(() => Location, (location) => location.city)
  locations!: Location[];
}
