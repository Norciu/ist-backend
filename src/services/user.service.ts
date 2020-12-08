import { Service } from "fastify-decorators";
import { compare, hash } from "bcrypt";
import { User } from "../models";
import { FastifyReply } from "fastify";

export interface AddNewUser {
  username: string;
  firstName: string;
  lastName: string;
  plainPassword?: string;
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

  public async addNew(opts: AddNewUser): Promise<User> {
    const hashedPass = await this.hashPass(opts.plainPassword)
    return await User.create({
      username: opts.username,
      firstName: opts.firstName,
      password: hashedPass,
      lastName: opts.lastName,
      phoneNo: opts.phoneNo,
      email: opts.email,
    });
  }

  public async isWorkingUser(): Promise<boolean> {
    const credentials = await this.getFromDatabase();
    console.log(credentials)
    if (credentials && !credentials.disabled) {
      return await compare(this.plainPassword, credentials.password);
    }
    return false;
  }

  private async hashPass(plainPassword?: string): Promise<string> {
    const pass = plainPassword || this.plainPassword;
    return await hash(pass, 10);
  }

  private async getFromDatabase(): Promise<User | null> {
    return await User.findOne({
      where: { username: this.username },
      attributes: ["username", "password"],
    });
  }

  public async setAuthenticated(
    reply: FastifyReply,
    requestBody: { username: string; password: string }
  ): Promise<{ _csrf: string; _jwt: string }> {
    const _csrf = await reply.generateCsrf();
    const _jwt = await reply.jwtSign({ requestBody });
    return { _csrf, _jwt };
  }
}
