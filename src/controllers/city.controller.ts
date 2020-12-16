import { Controller, PUT } from "fastify-decorators";
import { fastify } from "../fastify";
import { authHeaders } from "./schemas";
import { CityService } from "../services";
import { FastifyReply, FastifyRequest } from "fastify";

@Controller({ route: "/api/city" })
export default class CityController {
  constructor(private cityService: CityService) {}

  @PUT("/insert", {
    onRequest: fastify.auth([fastify.csrfProtection, fastify.verifyJWT]),
    schema: {
      headers: authHeaders,
      body: {
        require: ["cityName", "simc"],
        properties: {
          cityName: { type: "string" },
          simc: { type: "string" },
        },
      },
    },
  })
  async insertNewCity(
    request: FastifyRequest<{ Body: { cityName: string; simc: string } }>,
    reply: FastifyReply
  ) {
    const result = await this.cityService.insertToDatabase(request.body.cityName, request.body.simc);
    return reply.code(200).send(result)
  }
}
