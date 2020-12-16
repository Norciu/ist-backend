import { bootstrap } from "fastify-decorators";
import { resolve } from "path";
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import fastifyCsrf from "fastify-csrf";
import fastifyCookie from "fastify-cookie";
import fastifyJWTt from "fastify-jwt";
import fastifyCors from "fastify-cors";
import fastifyAuth, { FastifyAuthFunction } from "fastify-auth";
import fastifyHelmet from "fastify-helmet";
import { UserService } from "./services";

export const fastify: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({ logger: true });

fastify.register(fastifyCookie, {
  secret: "8ewHKAqytP9RejK8",
});

fastify.register(fastifyCsrf, {cookieOpts: {signed: true, path:'/'}, cookieKey: "_csrf"});

fastify.register(fastifyJWTt, {
  secret: "6GkNKuED5pxZFj4K",
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
      const jwtHeader = request.headers.authorization;
      if (!jwtHeader) {
         return done(new Error("Brak tokena JWT lub CSRF!"));
      }
      jwt.verify(jwtHeader, (err?: unknown, decoded?: any) => {
        if (err || !decoded.username || !decoded.password) {
          return done(new Error("Token jest nieprawidłowy!"));
        }

        const userService = new UserService(decoded.username, decoded.password);
        userService.isWorkingUser().then((val) => {
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
