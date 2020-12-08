import { bootstrap } from "fastify-decorators";
import { resolve } from "path";
import Fastify, { FastifyInstance } from "fastify";
import { istPg } from "./config";
import { IncomingMessage, Server, ServerResponse } from "http";
import fastifyCsrf from "fastify-csrf";
import fastifyCookie from "fastify-cookie";
import fastifyJWTt from "fastify-jwt";
import fastifyCors from "fastify-cors";
import { importModels } from "./models";

export const fastify: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify({ logger: true });

fastify.register(bootstrap, {
  directory: resolve(__dirname, "controllers"),
  mask: /\.controller\.(js|ts)$/,
});

fastify.register(fastifyCookie, {
  secret: "8ewHKAqytP9RejK8",
});

fastify.register(fastifyCsrf, {
  cookieOpts: {
    signed: true,
  },
});

fastify.register(fastifyJWTt, {
  secret: "6GkNKuED5pxZFj4K",
  cookie: { cookieName: "_jwt" },
});

fastify.register(fastifyCors, {
  origin: ["http://localhost:4200"]
})

importModels();

istPg.sync().then(async (x) => {
  await fastify.listen({ port: 3000 });
});
