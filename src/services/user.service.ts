import { Service } from "fastify-decorators";
import { compare, hash } from "bcrypt";
import { User } from "../entity";
import { FastifyReply } from "fastify";
import { getConnection, Repository } from "typeorm";

export interface AddNewUser {
  username?: string;
  firstName: string;
  lastName: string;
  plainPassword?: string;
  phoneNo?: string;
  email?: string;
  verificationToken?: string;
}

@Service()
export class UserService {
  private readonly username: string;
  private readonly plainPassword: string;

  private readonly userRepository: Repository<User> = getConnection().getRepository(
    User
  );
  constructor(username: string, password: string) {
    this.username = username;
    this.plainPassword = password;
  }

  public async addNew(opts: AddNewUser): Promise<User> {
    const hashedPass = await this.hashPass(
      opts.plainPassword || this.plainPassword
    );
    const user = new User();
    user.firstName = opts.firstName;
    user.lastName = opts.lastName;
    user.email = opts.email || user.email;
    user.password = hashedPass;
    user.phoneNo = opts.phoneNo || user.phoneNo;
    user.username = opts.username || this.username;
    user.verificationToken = opts.verificationToken || user.verificationToken;
    return this.userRepository.save(user);
  }

  public async isWorkingUser(): Promise<boolean> {
    const credentials = await this.getFromDatabase();
    if (credentials && !credentials.disabled) {
      return await compare(this.plainPassword, credentials.password);
    }
    return false;
  }

  private async hashPass(plainPassword?: string): Promise<string> {
    const pass = plainPassword || this.plainPassword;
    return await hash(pass, 10);
  }

  public async getFromDatabase(username?: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username: username || this.username },
      select: ["username", "password"],
    });
  }

  public async setAuthenticated(
    reply: FastifyReply,
    requestBody: { username: string; password: string }
  ): Promise<{ _csrf: string; _jwt: string }> {
    const _csrf = await reply.generateCsrf();
    const _jwt = await reply.jwtSign(requestBody);
    return { _csrf, _jwt };
  }
}
