import { fastify } from './fastify';
import 'reflect-metadata';
import { connection } from './config';

connection.create().then( () => fastify.listen({ port: 3000 }) );
