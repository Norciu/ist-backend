import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Technology } from './Technology';
import { Street } from './Street';
import { City } from './City';
import { LocationOwner } from './LocationOwner';
import { Comment } from './Comment';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'flat_no',
    length: 20,
    nullable: true
  })
  flatNo!: string;

  @Column({ name: 'home_no', length: 4 })
  homeNo!: string;

  @Column({
    name: 'plot_no',
    default: null,
    length: 40
  })
  plotNo!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: number;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: number;

  @ManyToOne(type => LocationOwner, locationOwner => locationOwner.locationOwner)
  location_owner!: LocationOwner;

  @ManyToOne((type) => Street, (street) => street.locations, {
    nullable: false,
  })
  street!: Street;

  @ManyToOne((type) => City, (city) => city.locations, {
    nullable: false
  })
  city!: City;

  @ManyToOne((type) => Technology, (technology) => technology.location, {
    nullable: false,
  })
  availableTechnology!: Technology;

  @OneToMany(() => Comment, ({ location }) => location)
  comment!: Comment[];
}
