import { Controller, GET, POST } from "fastify-decorators";
import { fastify } from "../fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/";

@Controller({ route: "/api/user" })
export default class UserController {
  @POST({
    url: "/login",
    options: {
      schema: {
        body: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
  })
  async login(
    request: FastifyRequest<{ Body: { username: string; password: string } }>,
    reply: FastifyReply
  ): Promise<{ _csrf: string; _jwt: string } | { "401": "Unauthorized" }> {
    const userService = new UserService(
      request.body.username,
      request.body.password
    );
    const enabledUser = await userService.isWorkingUser();
    if (enabledUser) {
      const tokens = await userService.setAuthenticated(reply, request.body);
      return reply.code(200).send(tokens);
    }
    return reply.code(401).send("Unauthorized");
  }

  @GET({
    url: "/is-logged",
    options: {
      onRequest: fastify.auth([fastify.csrfProtection, fastify.verifyJWT]),
    },
  })
  async isLogged(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({isLogged: true});
  }
}
