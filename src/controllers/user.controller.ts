import { Controller, GET, POST } from 'fastify-decorators';
import { fastify } from '../fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/';
import { authHeader } from './schemas';
import * as _ from 'lodash';

@Controller({ route: '/api/user' })
export default class UserController {
  constructor(private userService: UserService) {
  }

  @POST({
    url: '/login',
    options: {
      schema: {
        body: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
  })
  async login(
    request: FastifyRequest<{ Body: { username: string; password: string } }>,
    reply: FastifyReply
  ): Promise<{ _csrf: string; _jwt: string } | { '401': 'Unauthorized' }> {
    const username = request.body.username;
    const user = await this.userService.getUserFromDatabase(username);
    if (!user || (user && user.disabled)) {
      throw new Error('Unauthorized');
    }
    if (this.userService.comparePass(request.body.password, user.password)) {
      const authorization = await reply.jwtSign(_.omit(user, ['password']));
      return reply.code(200).send({ username:user, authorization });
    }
    return reply.code(401).send('Unauthorized');
  }

  @GET({
    url: '/is-logged',
    options: {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: {
        headers: authHeader,
      }
    },
  })
  async isLogged(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({ isLogged: true });
  }
}
