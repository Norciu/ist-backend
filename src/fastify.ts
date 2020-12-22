import { bootstrap } from "fastify-decorators";
import { resolve } from "path";
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import fastifyCookie from "fastify-cookie";
import fastifyJWTt from "fastify-jwt";
import fastifyCors from "fastify-cors";
import fastifyAuth, { FastifyAuthFunction } from "fastify-auth";
import fastifyHelmet from "fastify-helmet";
import { UserService } from "./services";
import {environments as env} from "./config";

export const fastify: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({ logger: true });

fastify.register(fastifyCookie, {
  secret: env.secrets.cookie,
});

fastify.register(fastifyJWTt, {
  secret: env.secrets.jwt,
  cookie: {
    cookieName: "_jwt"
  },
});

fastify.register(fastifyCors, {
  origin: ["http://localhost:4200"],
  credentials: true,
});

fastify.register(fastifyHelmet);

declare module "fastify" {
  interface FastifyInstance {
    verifyJWT: FastifyAuthFunction;
  }
}

fastify
  .decorate(
    "verifyJWT",
    (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (error?: Error) => void
    ) => {
      const jwt = fastify.jwt;
      const jwtHeader = request.raw.headers.authorization;
      const jwtCookie = request.cookies._jwt
      if (!jwtHeader || !jwtCookie || (jwtHeader !== jwtCookie)) {
        return done(new Error("Brak tokena JWT lub jest on niezgodny!"));
      }
      jwt.verify(jwtHeader, (err?: unknown, decoded?: any) => {
        if (err || !decoded.username || !decoded.password) {
          return done(new Error("Token jest nieprawidłowy!"));
        }

        const userService = new UserService();
        userService.isWorkingUser(decoded.username, decoded.password).then((val) => {
          return val
            ? done()
            : done(new Error("Podany token nie pasuje do użytkownika!"));
        });
      });
    }
  )
  .register(fastifyAuth)
  .register(bootstrap, {
    directory: resolve(__dirname, "controllers"),
    mask: /\.controller\.(js|ts)$/,
  });
