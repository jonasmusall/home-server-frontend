import * as fastifyCookie from '@fastify/cookie';
import * as fastifyFormbody from '@fastify/formbody';
import * as fastifyStatic from '@fastify/static';
import fastify, { FastifyInstance } from 'fastify';
import type { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import { html } from './components/html.js';
import { signInForm } from './components/signInForm.js';
import { singOutForm } from './components/singOutForm.js';
import * as fastifySchemas from './fastify-schemas.js';
import { verify } from './lib/jwt.js';
import { PROJECTROOT, postJson } from './lib/util.js';

const PORT = 8888;
const AUTH_HOST = 'http://localhost:8889';

const publicKey: string = (await (await fetch(`${AUTH_HOST}/publickey`)).json()).publicKey;
console.log(publicKey.length);

const app: FastifyInstance = fastify();

app.register(fastifyCookie);

app.register(fastifyFormbody);

app.register(fastifyStatic, {
  root: path.resolve(PROJECTROOT, 'static'),
  prefix: '/static/'
});

app.get('/', async (request, reply) => {
  const token = request.cookies.token === undefined ? undefined : await verify(request.cookies.token, publicKey) as JwtPayload;
  reply.type('text/html');
  if (token === undefined) {
    reply.header('Set-Cookie', `signInFailed=0; Max-Age=0; Path=/; Secure; SameSite=Strict`);
    reply.send(html('test', signInForm('/sign-in', request.cookies.signInFailed !== undefined)));
    return;
  }
  reply.send(html('test', `<p>Signed in as ${token.sub}</p>`, singOutForm('/sign-out')));
});

app.post<{
  Body: fastifySchemas.ISignInBody
}>(
  '/sign-in',
  { schema: { body: fastifySchemas.signInBodySchema } },
  async (request, reply) => {
    const authReply = await postJson(`${AUTH_HOST}/user/${request.body.username}/token`, `{ "password": "${request.body.password}" }`);
    reply.code(302);
    if (!authReply.ok) {
      console.log(`(auth-provider:post:/user/${request.body.username}/token) ${authReply.status} ${authReply.statusText} ${await authReply.text()}`);
      reply.header('Set-Cookie', `signInFailed=1; Max-Age=1; Path=/; Secure; SameSite=Strict`);
      reply.header('Location', '/');
      reply.send();
      return;
    }
    const authReplyJson = await authReply.json();
    reply.header('Set-Cookie', `token=${authReplyJson.token}; Max-Age=${authReplyJson.maxAge}; Path=/; Secure; SameSite=Strict`);
    reply.header('Location', '/');
    reply.send();
  }
);

app.post('/sign-out', async (request, reply) => {
  reply.code(302);
  reply.header('Set-Cookie', `token=_; Max-Age=0; Path=/; Secure; SameSite=Strict`);
  reply.header('Location', '/');
  reply.send();
});

app.listen({ port: PORT }, (err, addr) => {
  if (err) throw err;
  console.log(`Listening on ${addr}`);
});
