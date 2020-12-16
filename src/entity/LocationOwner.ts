import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Location} from "./Location";
import {IsEmail, Matches} from "class-validator";

@Entity()
export class LocationOwner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "first_name",
    length: 50
  })
  firstName!: string;

  @Column({
    name: "last_name",
    length: 50
  })
  lastName!: string;

  @Column({
    name: "phone_no",
    length: 20,
    default: null
  })
  @Matches(/(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/)
  phoneNo!: string;

  @Column({
    length: 100,
    default: null
  })
  @IsEmail()
  email!: string;

  @CreateDateColumn({name: "created_at", type: "timestamp"})
  createdAt!: number;

  @CreateDateColumn({name: "updated_at", type: "timestamp"})
  updatedAt!: number;

  @OneToMany(type => Location, location => location.location_owner)
  locationOwner!: Location[];
}
