import { bootstrap } from "fastify-decorators";
import { resolve } from "path";
import Fastify, { FastifyInstance } from "fastify";
// import {istPg} from "./config";
import { IncomingMessage, Server, ServerResponse } from "http";
import fastifyCsrf from "fastify-csrf";
import fastifyCookie from "fastify-cookie";

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

fastify.listen(3000);
