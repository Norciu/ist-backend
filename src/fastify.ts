import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import fastifyJWTt from 'fastify-jwt';
import fastifyCors from 'fastify-cors';
import fastifyAuth, { FastifyAuthFunction } from 'fastify-auth';
import fastifyHelmet from 'fastify-helmet';
import env from './config/environments';

export const fastify: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({ logger: true });

fastify.register(fastifyJWTt, {
  secret: env.secrets.jwt || 'qwerty',
});

fastify.register(fastifyCors, {
  origin: ['http://localhost:4200'],
  credentials: true,
});

fastify.register(fastifyHelmet);

declare module 'fastify' {
  interface FastifyInstance {
    verifyJWT: FastifyAuthFunction;
  }
}

fastify.decorate('verifyJWT', (request: FastifyRequest, reply: FastifyReply, done: (error?: Error) => void) => {
  const jwtHeader = request.raw.headers.authorization;

  if (!jwtHeader) {
    return done(new Error('Brak tokena JWT!'));
  }

  fastify.jwt.verify(jwtHeader, (err?: unknown, decoded?: any) => {
    if (err || !decoded) {
      return done(new Error('Token jest nieprawidłowy!'));
    }

    return done();
  });
}).register(fastifyAuth).register(bootstrap, { directory: resolve(__dirname, 'controllers'), mask: /\.controller\.(js|ts)$/ });
