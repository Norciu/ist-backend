import { Service } from 'fastify-decorators';
import { getConnection, Repository } from 'typeorm';
import { LocationOwner } from '../entity';
import { LocationOwner as LocationOwnerType } from '../interfaces';

@Service()
export class LocationOwnerService {
  private readonly locationOwnerRepository: Repository<LocationOwner> = getConnection().getRepository(
    LocationOwner
  );

  constructor() {}

  public async insertToDatabase(client: LocationOwnerType): Promise<LocationOwner> {
    const locOwn = new LocationOwner();
    locOwn.clientType = parseInt(client.clientType);
    locOwn.firstName = client.firstName;
    locOwn.lastName = client.lastName;
    locOwn.companyName = client.clientType === '2' ? client.companyName : locOwn.companyName;
    locOwn.phoneNo = client.phoneNo || locOwn.phoneNo;
    locOwn.email = client.email || locOwn.email;
    return await this.locationOwnerRepository.save(locOwn);
  }
}
