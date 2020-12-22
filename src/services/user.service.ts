import { Service } from "fastify-decorators";
import { compare, hash } from "bcrypt";
import { User } from "../entity";
import { FastifyReply } from "fastify";
import { getConnection, Repository } from "typeorm";

export interface AddNewUser {
  username: string;
  firstName: string;
  lastName: string;
  plainPassword: string;
  phoneNo?: string;
  email?: string;
  verificationToken?: string;
}

@Service()
export class UserService {
  private readonly userRepository: Repository<User> = getConnection().getRepository(
    User
  );
  constructor() {}

  public async addNew(opts: AddNewUser): Promise<User> {
    const hashedPass = await this.hashPass(opts.plainPassword);
    const user = new User();
    user.firstName = opts.firstName;
    user.lastName = opts.lastName;
    user.email = opts.email || user.email;
    user.password = hashedPass;
    user.phoneNo = opts.phoneNo || user.phoneNo;
    user.username = opts.username;
    user.verificationToken = opts.verificationToken || user.verificationToken;
    return this.userRepository.save(user);
  }

  public async isWorkingUser(username: string, plainPassword: string): Promise<boolean> {
    const credentials = await this.getFromDatabase(username);
    if (credentials && !credentials.disabled) {
      return await compare(plainPassword, credentials.password);
    }
    return false;
  }

  private async hashPass(plainPassword: string): Promise<string> {
    const pass = plainPassword;
    return await hash(pass, 10);
  }

  public async getFromDatabase(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username: username },
      select: ["username", "password"],
    });
  }

  public setCookies(reply: FastifyReply, opts: {jwt: string, username: string}): FastifyReply {
    reply.setCookie("_jwt", opts.jwt, {
      domain: "localhost",
      path: "/",
      sameSite: true,
    }).setCookie("_username", opts.username, {
      domain: "localhost",
      path: "/",
      sameSite: true,
    })
    return reply;
  }

  public async setAuthenticated(
    reply: FastifyReply,
    requestBody: { username: string; password: string }
  ): Promise<{ _jwt: string }> {
    const _jwt = await reply.jwtSign(requestBody);
    return { _jwt };
  }
}
