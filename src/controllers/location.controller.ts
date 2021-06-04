import { Controller, GET, PUT } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import { fastify } from '../fastify';
import { authHeader } from './schemas';
import { Location as LocationInterface } from '../interfaces';
import { Location } from '../entity';
import { LocationOwnerService } from '../services/locationOwner.service';
import { LocationService } from '../services/location.service';

@Controller({ route: '/api/location' })
export default class LocationController {
  constructor(
    private locationOwnerService: LocationOwnerService,
    private locationService: LocationService
  ) {}

  @PUT({
    url: '/insert',
    options: {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: {
        headers: authHeader,
        body: {
          type: 'object',
          required: ['address', 'technology'],
          properties: {
            clientInfo: {
              type: ['object'],
              properties: {
                clientType: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                phoneNo: { type: 'string' },
                email: { type: 'string' },
              },
            },
            address: {
              type: 'object',
              required: ['city', 'street', 'homeNo'],
              properties: {
                city: { type: 'string' },
                street: { type: 'string' },
                flatNo: { type: 'string' },
                homeNo: { type: 'string' },
                plotNo: { type: 'string' },
              },
            },
            technology: { type: 'string' },
          },
        },
      },
    },
  })
  async insertToDatabase(
    request: FastifyRequest<{ Body: LocationInterface }>,
    reply: FastifyReply
  ) {
    const client = request.body.clientInfo;
    const address = request.body.address;
    const technology = request.body.technology;
    const ownerDbResult = client
      ? await this.locationOwnerService.insertToDatabase(client)
      : undefined;
    ownerDbResult
      ? await this.locationService.insertToDatabase({
        address,
        technology,
        locOwner: ownerDbResult,
      })
      : await this.locationService.insertToDatabase({ address, technology });
    return reply.code(200).send({ status: 'Added' });
  }

  @GET({ url: '/get-all', options: {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader
    }
  } })
  getAllLocations(request: FastifyRequest, reply: FastifyReply) {
    return this.locationService.getAll();
  }
}
