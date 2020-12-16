import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
import { Matches, IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 50,
    unique: true,
  })
  username!: string;

  @Column({
    name: "first_name",
    nullable: false,
    length: 50,
  })
  firstName!: string;

  @Column({
    name: "last_name",
    nullable: false,
    length: 50,
  })
  lastName!: string;

  @Column({
    nullable: false,
  })
  password!: string;

  @Column({
    name: "phone_no",
    length: 15,
    default: null,
  })
  @Matches(
    /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/
  )
  phoneNo!: string;

  @Column({
    default: null,
    unique: true,
  })
  @IsEmail()
  email!: string;

  @Column({
    name: "verification_token",
    default: null,
  })
  verificationToken!: string;

  @Column({
    default: false,
  })
  disabled!: boolean;

  @CreateDateColumn({name: "created_at", type: "timestamp"})
  createdAt!: number;

  @CreateDateColumn({name: "updated_at", type: "timestamp"})
  updatedAt!: number;
}
