import { getConnection, Repository } from "typeorm";
import { Street, City } from "../entity";

export default class StreetService {
  private static readonly streetRepository: Repository<Street> = getConnection().getRepository(
    Street
  );
  // private static readonly cityRepository: Repository<City> = getConnection().getRepository(City)

  public static async insertToDatabase(
    cityId: number,
    streetName: string,
    ulic: string
  ): Promise<Street> {
    const street: Street = new Street();
    const city: City = new City();
    city.id = cityId;
    street.city = new City();
    street.streetName = streetName;
    street.ulic = ulic;
    return await this.streetRepository.save(street);
  }
}
