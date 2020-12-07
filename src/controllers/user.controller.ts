import { Controller, GET, POST } from "fastify-decorators";
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
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  })
  async login(
    request: FastifyRequest<{ Body: { username: string; password: string } }>,
    reply: FastifyReply
  ) {
    const userService = new UserService(
      request.body.username,
      request.body.password
    );
    const enabledUser = userService.isWorkingUser();
    if (enabledUser) {
    }
  }

  @GET({ url: "/csrf" })
  async csrf(request: FastifyRequest, reply: FastifyReply) {
    const token = await reply.generateCsrf();
    return { token };
  }
}
