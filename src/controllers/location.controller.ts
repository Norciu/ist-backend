import {Controller, GET} from "fastify-decorators";
import {FastifyReply, FastifyRequest} from "fastify";

@Controller({route: "/api/location"})
export default class LocationController {

  @GET({url: "/:id"})
  async getLocation(request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send("OK")
  }
}
