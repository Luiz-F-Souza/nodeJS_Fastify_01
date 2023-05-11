import { FastifyReply, FastifyRequest } from 'fastify'

// SE HOUVER RETURN DENTRO DE UM MIDDLEWARE O FASTIFY ENTENDE QUE HOUVE ALGUM ERRO E RETORNA O VALOR EM QUESTÃO
export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return reply.status(401).send({
      error: 'unauthorized',
    })
  }
}
