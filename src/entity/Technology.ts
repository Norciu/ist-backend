import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Location} from "./Location";

@Entity()
export class Technology {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "technology_name",
    nullable: false,
    unique: true,
  })
  technologyName!: string;

  @CreateDateColumn({name: "created_at", type: "timestamp"})
  createdAt!: number;

  @CreateDateColumn({name: "updated_at", type: "timestamp"})
  updatedAt!: number;

  @OneToMany(type => Location, location => location.availableTechnology)
  location!: Location

}
