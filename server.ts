import Fastify from 'fastify'
const fastify = Fastify({
  // logger: true
})

const memory: Record<string, string> = {}

fastify.get('/', async function handler(_, reply) {
  return reply.send(memory)
})

fastify.get('/set', async function handler(request, reply) {
  const query = request.query as Record<string, string>;
  Object.entries(query).forEach(([key, value]) => {
    memory[key] = value as string;
  });
  return reply.send({ message: 'success' });
})

fastify.get('/get', async function handler(request, reply) {
  const query = request.query as { key: string };
  const value = memory[query.key];

  if (!value) {
    return reply.status(404).send({ message: 'not found' });
  }

  return reply.send({ value });
})

async function main() {
  try {
    await fastify.listen({ port: 4000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
main()