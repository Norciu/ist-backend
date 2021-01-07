import { Controller, GET, POST, PUT } from "fastify-decorators";
import { fastify } from "../fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { CityService, UserService } from "../services/";
import { authHeader } from "./schemas";
import { StreetService } from "../services/street.service";

@Controller({ route: "/api/street" })
export default class StreetController {
  constructor(
    private streetService: StreetService,
    private cityService: CityService
  ) {}

  @PUT("/insert", {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
      body: {
        type: "object",
        required: ["citySimc", "streetName", "ulic"],
        properties: {
          citySimc: { type: "string" },
          streetName: { type: "string" },
          ulic: { type: "string" },
        },
      },
    },
  })
  async insertStreetToDatabase(
    request: FastifyRequest<{
      Body: { citySimc: string; streetName: string; ulic: string };
    }>,
    reply: FastifyReply
  ) {
    const streetName = request.body.streetName;
    const ulic = request.body.ulic;
    const result = await this.streetService.insertToDatabase(
      request.body.citySimc,
      streetName,
      ulic
    );
    return reply.code(200).send({ added: true });
  }

  @GET("/available-cities", {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
    },
  })
  async getAvailableCities(request: FastifyRequest, reply: FastifyReply) {
    const cities = await this.cityService.getAllCitiesForStreets();
    return reply.code(200).send(cities);
  }

  @GET("/get-all", {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
    },
  })
  async getAvailableStreets(request: FastifyRequest, reply: FastifyReply) {
    const streets = await this.streetService.getAvailableStreets();
    return reply.code(200).send(streets);
  }

  @GET("/search", {
    onRequest: fastify.auth([fastify.verifyJWT]),
    schema: {
      headers: authHeader,
      querystring: {
        required: ["simc"],
        properties: {
          simc: { type: "string" },
        },
      },
    },
  })
  async searchStreets(
    request: FastifyRequest<{ Querystring: { simc: string } }>,
    reply: FastifyReply
  ) {
    const streets = await this.streetService.getStreets(request.query.simc);
    return reply.code(200).send(streets);
  }
}
