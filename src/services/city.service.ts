import { Service } from "fastify-decorators";
import { City } from "../entity";
import { getConnection, Repository } from "typeorm";

@Service()
export class CityService {
  private readonly cityRepository: Repository<City> = getConnection().getRepository(
    City
  );
  constructor() {}

  public async insertToDatabase(city: string, postalCode: string, simc: string): Promise<City | undefined> {
    const existInDatabase: boolean = await this._existInDatabase(city, simc);
    if (existInDatabase) {
      return undefined;
    }
    const cityEntity = new City();
    cityEntity.cityName = city;
    cityEntity.postalCode = postalCode;
    cityEntity.simc = simc;
    return await this.cityRepository.save(cityEntity);
  }

  private async _existInDatabase(cityName: string, simc: string): Promise<boolean> {
    const result: City | undefined = await this.cityRepository.findOne({where: {cityName, simc}})
    return result instanceof City;
  }

  public async findCity(citySimc: string): Promise< City | undefined> {
    const res = await this.cityRepository.findOne({
      where: { simc: citySimc },
    });
    return res
  }

  public async getAllCitiesFromDatabase(): Promise<City[]> {
    return await this.cityRepository.find();
  }

  public async getAllCitiesForStreets(): Promise<City[]> {
    return await this.cityRepository.find({select: ["id", "cityName", "simc"]});
  }
}
