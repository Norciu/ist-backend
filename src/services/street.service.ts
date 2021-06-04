import { getConnection, Repository, createQueryBuilder } from 'typeorm';
import { Street, City } from '../entity';
import { Service } from 'fastify-decorators';
import { CityService } from './city.service';

@Service()
export class StreetService {
  private readonly streetRepository: Repository<Street> = getConnection().getRepository(
    Street
  );
  private readonly cityRepository: Repository<City> = getConnection().getRepository(
    City
  );

  constructor(private cityService: CityService) {}

  public async insertToDatabase(
    citySimc: string,
    streetName: string,
    ulic: string
  ): Promise<Street> {
    const street: Street = new Street();
    const cityId = await this.cityService.findCity(citySimc);
    if (!cityId) {
      throw new Error('Nie znaleziono miejscowości!');
    }
    street.city = cityId;
    street.streetName = streetName;
    street.ulic = ulic;
    return await this.streetRepository.save(street);
  }

  public async getAvailableStreets(): Promise<Street[]> {
    return this.streetRepository.find({ relations: ['city'] });
  }

  public async getStreets(citySIMC: string): Promise<unknown[]> {
    const res = await createQueryBuilder('street', 'street')
      .leftJoinAndSelect('street.city', 'city')
      .where('city.simc = :citySIMC', { citySIMC })
      .getMany();
    return res;
  }

  public async findStreet(streetUlic: string): Promise<Street | undefined> {
    return this.streetRepository.findOne({ where: { ulic: streetUlic } });
  }
}
