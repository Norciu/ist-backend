import { Service } from "fastify-decorators";
import {createQueryBuilder, getConnection, Repository} from "typeorm";
import { Location, LocationOwner } from "../entity";
import { LocationAddress } from "../interfaces";
import { CityService } from "./city.service";
import { StreetService } from "./street.service";
import { TechnologyService } from "./technology.service";

@Service()
export class LocationService {
  private readonly locationRepository: Repository<Location> = getConnection().getRepository(
    Location
  );

  constructor(
    private cityService: CityService,
    private streetService: StreetService,
    private technologyService: TechnologyService
  ) {}

  public async insertToDatabase(opts: {
    address: LocationAddress;
    technology: string;
    locOwner?: LocationOwner;
  }): Promise<Location> {
    const loc = new Location();
    loc.location_owner = opts.locOwner || loc.location_owner;
    loc.city = (await this.cityService.findCity(opts.address.city)) || loc.city;
    loc.street =
      (await this.streetService.findStreet(opts.address.street)) || loc.street;
    loc.availableTechnology =
      (await this.technologyService.findTechnology(opts.technology)) ||
      loc.availableTechnology;
    loc.flatNo = opts.address.flatNo || loc.flatNo;
    loc.homeNo = opts.address.homeNo;
    return await this.locationRepository.save(loc);
  }

  public async getAll(): Promise<unknown[]> {
    return await createQueryBuilder("location", "location")
        .leftJoinAndSelect("location.location_owner", "locationOwner")
        .leftJoinAndSelect("location.street", "street")
        .leftJoinAndSelect("street.city", "city")
        .leftJoinAndSelect("location.availableTechnology", "technology")
        .getMany();
  }
}
