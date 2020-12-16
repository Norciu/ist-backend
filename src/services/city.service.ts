import {Service} from 'fastify-decorators'
import { City } from "../entity";
import { getConnection, Repository } from "typeorm";

@Service()
export class CityService {
  private readonly cityRepository: Repository<City> = getConnection().getRepository(
    City
  );

  public async insertToDatabase(city: string, simc: string): Promise<City> {
    const cityEntity = new City();
    cityEntity.cityName = city;
    cityEntity.simc = simc;

    return await this.cityRepository.save(cityEntity);
  }

  public async findCityId(cityName: string): Promise<City | undefined> {
    return await this.cityRepository.findOne({ where: { cityName: cityName }, select: ["id"] });
  }
}
