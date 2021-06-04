import { connection } from "../config";
import { CityService } from "../services";
import { City } from "../entity";
import { StreetService } from "../services/street.service";
import { Street } from "../entity";
import { configureServiceTest } from "fastify-decorators/testing";

beforeAll(async () => {
  await connection.create();
  const streetService =
  let service: StreetService = configureServiceTest({
    service: StreetService,
    mocks: [
      {
        provide: StreetService,
        useValue: streetService,
      },
    ],
  });
});

afterAll(async () => {
  await connection.close();
  jest.restoreAllMocks();
});

describe("Streets service tests", () => {
  test("Save new street with relation", async () => {
    const city: City | undefined = await new CityService().findCity("Wola");
    if (!city) {
      throw new Error("Brak takiej miejscowości!");
    }
    const result: Street = await new StreetService().insertToDatabase(
      city.id,
      "Przemysłowa",
      "17742"
    );
    return expect(result).toEqual(
      expect.objectContaining({
        city_name: "Wola",
        simc: "0217120",
      })
    );
  });

  test("Get City id", async () => {
    const result: City | undefined = await new CityService().findCity("Wola");
    return expect(result).toEqual({ id: 1 });
  });

  test("Get street with city relation", async () => {
    const result:
      | Street[]
      | undefined = await new StreetService().getAvailableStreets();
    return console.log(result);
  });
});
