import { Controller, GET, PUT } from 'fastify-decorators';
import { fastify } from '../fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import { authHeader } from './schemas';
import { TechnologyService } from '../services/technology.service';

@Controller({ route: '/api/technology' })
export default class TechnologyController {

  constructor(private technologyService: TechnologyService) {
  }

  @PUT({
    url: '/insert',
    options: {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: {
        headers: authHeader,
        body: {
          required: ['technologyName'],
          properties: {
            technologyName: { type: 'string' },
          },
        },
      },
    },
  })
  async insertToDatabase(
    request: FastifyRequest<{ Body: { technologyName: string } }>,
    reply: FastifyReply
  ) {
    const techName = request.body.technologyName;
    const result = await this.technologyService.insertToDatabase(techName);
    return reply.code(200).send({ status: 'Added' });
  }

  @GET({
    url: '/get-all',
    options: {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: {
        headers: authHeader,
      }
    }
  })
  async getAvailableTechnologies(request: FastifyRequest, reply: FastifyReply) {
    const tech = await this.technologyService.getAvailable();
    return reply.code(200).send(tech);
  }

}
