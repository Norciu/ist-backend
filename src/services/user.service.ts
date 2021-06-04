import { Service } from 'fastify-decorators';
import { compareSync, hashSync } from 'bcrypt';
import { User } from '../entity';
import { getConnection, Repository } from 'typeorm';

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

  private hashPass(plainPassword: string): string {
    const pass = plainPassword;
    return hashSync(pass, 10);
  }

  comparePass(plain: string, hashed: string): boolean {
    return compareSync(plain, hashed);
  }

  public getUserFromDatabase(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username: username } });
  }
}
