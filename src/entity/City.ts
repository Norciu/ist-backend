import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Street } from "./Street";
import { Location } from "./Location";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "city_name",
    length: 50,
  })
  cityName!: string;

  @Column({
    nullable: false,
    length: 7,
    unique: true
  })
  simc!: string;

  @CreateDateColumn({name: "created_at", type: "timestamp"})
  createdAt!: number;

  @CreateDateColumn({name: "updated_at", type: "timestamp"})
  updatedAt!: number;

  @OneToMany((type) => Street, (street) => street.city, {cascade:true})
  streets!: Street[];

  @OneToMany((type) => Location, (location) => location.street, {cascade: true})
  locations!: Location[];
}
