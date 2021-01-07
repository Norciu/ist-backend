import { Controller, GET, PUT } from "fastify-decorators";
import { fastify } from "../fastify";
import { authHeader } from "./schemas";
import { CityService } from "../services";
import { FastifyReply, FastifyRequest } from "fastify";

@Controller({ route: "/api/city" })
export default class CityController {
  constructor(private cityService: CityService) {}

  @PUT("/insert", {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
      body: {
        require: ["cityName", "postalCode", "simc"],
        properties: {
          cityName: { type: "string" },
          postalCode: { type: "string" },
          simc: { type: "string" },
        },
      },
    },
  })
  async insertNewCity(
    request: FastifyRequest<{
      Body: { cityName: string; postalCode: string; simc: string };
    }>,
    reply: FastifyReply
  ) {
    const result = await this.cityService.insertToDatabase(
      request.body.cityName,
      request.body.postalCode,
      request.body.simc
    );
    return !result
      ? reply.code(204).send({ status: "CityExist" })
      : reply.code(201).send({ status: "Added" });
  }

  @GET("/get-all", {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
    },
  })
  async getAllCities(request: FastifyRequest, reply: FastifyReply) {
    const cities = await this.cityService.getAllCitiesFromDatabase();
    return reply.code(200).send(cities);
  }
}
