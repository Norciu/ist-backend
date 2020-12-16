import {fastify} from "./fastify";
import "reflect-metadata";
import {connection} from "./config/typeorm";

connection.create().then(async val => {console.log("Typeorm connected");
  await fastify.listen({ port: 3000 });

})


