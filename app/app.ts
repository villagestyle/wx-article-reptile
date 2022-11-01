import fastify from 'fastify';
import { setupBaseRouter } from './routes/index';
import { setupUserRouter } from './routes/user';

const app = fastify({
  logger: true
});

app.setErrorHandler((err, req, res) => {
  res.status(500).send(err);
})

setupBaseRouter(app);
setupUserRouter(app);

app.listen(5050, () => {
  console.log('server running...');
});


export default app;

// https://github.com/fastify/fastify-example-twitter