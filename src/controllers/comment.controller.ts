import { Controller, GET, PUT } from 'fastify-decorators';
import { CommentService } from '../services/comment.service';
import { fastify } from '../fastify';
import { authHeader } from './schemas';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller({ route: '/api/comment' })
export default class CommentController {
  constructor(private commentService: CommentService) {}

  @PUT('/add', {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
      body: {
        require: ['description', 'location'],
        properties: {
          description: { type: 'string' },
          location: { type: 'number' }
        },
      },
    },
  })
  async add(request: FastifyRequest<{Body: { description: string, locationId: number }, Headers: { authorization: string }}>, reply: FastifyReply) {
    //@ts-ignore
    const { id: userId } = fastify.jwt.decode(request.headers.authorization);
    await this.commentService.add({ userId, locationId: request.body.locationId, description: request.body.description });
    return reply.code(201).send({ success: true });
  }

  @GET('/get/:locationId', {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
      params: {
        require: ['locationId'],
        properties: {
          locationId: { type: 'string' }
        }
      }
    }
  })
  get(request: FastifyRequest<{Params: {locationId: string}}>, replay: FastifyReply) {
    return this.commentService.get(Number(request.params.locationId));
  }

}
