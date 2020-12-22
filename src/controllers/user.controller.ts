import {Controller, GET, POST} from "fastify-decorators";
import { fastify } from "../fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/";
import {authHeader} from "./schemas";

@Controller({ route: "/api/user" })
export default class UserController {
  constructor(private userService: UserService) {
  }

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
    const user = request.body.username;
    const pass = request.body.password;
    const enabledUser = await this.userService.isWorkingUser(user, pass);
    if (enabledUser) {
      const token = await reply.jwtSign(request.body);
      return this.userService.setCookies(reply, {jwt: token, username: user})
        .code(200)
        .send({token});
    }
    return reply.code(401).send("Unauthorized");
  }

  @GET({
    url: "/is-logged",
    options: {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: {
        headers: authHeader,
      }
    },
  })
  async isLogged(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({ isLogged: true });
  }
}
