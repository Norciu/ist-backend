import { Service } from "fastify-decorators";
import { compare } from "bcrypt";
import { UserModel } from "../models";

export interface AddNewUser {
  username: string;
  firstName: string;
  lastName: string;
  phoneNo?: string | null;
  email?: string | null;
}

@Service()
export class UserService {
  private readonly username: string;
  private readonly plainPassword: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.plainPassword = password;
  }

  public async addNew(opts: AddNewUser): Promise<UserModel> {
    return await UserModel.create({
      username: opts.username,
      firstName: opts.firstName,
      lastName: opts.lastName,
      phoneNo: opts.phoneNo,
      email: opts.email,
    });
  }

  public async isWorkingUser(): Promise<boolean> {
    const credentials = await this.getFromDatabase();
    if (credentials && !credentials.disabled) {
      return await compare(this.plainPassword, credentials.password);
    }
    return false;
  }

  // private async hashPass(): Promise<string> {
  //   return await hash(this.plainPassword, 10);
  // }

  private async getFromDatabase(): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: { username: this.username },
      attributes: ["username", "password"],
    });
  }
}
