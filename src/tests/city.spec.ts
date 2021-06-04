import { connection } from '../config/';
import { CityService } from '../services/';

beforeAll( () => connection.create() );

afterAll( () => connection.close() );

describe('City service tests', () => {
  test('Save new city', async () => {
    const cityService: CityService = new CityService();
    const result = await cityService.insertToDatabase('Wola', '43-225', '0217120');
    return expect(result).toEqual(
      expect.objectContaining({
        city_name: 'Wola',
        postalCode: '43-225',
        simc: '0217120',
      })
    );
  });

  test('Find all cities added to database', async () => {
    const cityService: CityService = new CityService();
    const result = await cityService.getAllCitiesFromDatabase();
    return expect(result);
  });
});
