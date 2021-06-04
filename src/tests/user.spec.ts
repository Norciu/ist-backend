import { UserService } from '../services';
import { connection } from '../config/typeorm';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

describe('User test', () => {
  test('Add new user to database', async () => {
    const userService = new UserService();
    const result = await userService.addNew({
      firstName: 'Norbert',
      lastName: 'Czubin',
      username: 'n.czubin',
      plainPassword: 'qwerty'
    });
    return expect(result).toEqual(
      expect.objectContaining({
        username: 'n.czubin',
        firstName: 'Norbert',
        lastName: 'Czubin',
        disabled: false,
      })
    );
  });

  test('Get user from database', async () => {
    const userService = new UserService();
    const result = await userService.getFromDatabase('n.czubin');
    return expect(result).toEqual({ username: 'n.czubin', password: expect.anything() });
  });
});
