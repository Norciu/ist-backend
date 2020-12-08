import { istPg } from "../config";
import { Model, DataTypes } from "sequelize";

export class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  phoneNo!: string | null;
  email!: string | null;
  verificationToken!: string | null;
  disabled!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING(15),
      validate: {
        is: /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/,
      },
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(50),
      validate: {
        isEmail: true,
      },
      defaultValue: null,
    },
    verificationToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: istPg,
  }
);

export interface UserModelInterface {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNo?: string | null;
  email?: string | null;
  verificationToken?: string | null;
  disabled: boolean;
}
