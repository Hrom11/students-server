import cors from 'cors';
import express from 'express';
import { config } from './src/config';
import { corsMiddleWare } from './src/corsMiddleware';
import migrateAll from './src/simpleMigration/students';
import { studentRouter } from './src/students/route';

const app = express();
const port = 3001;

app.use(cors(config.cors));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/student', studentRouter);

console.log('currentConfig', config);

const server = app.listen(port, async () => {

  await migrateAll();
  return console.log(`server is listening on ${port}`);
});

const shutdown = () => {
  console.log('close http server');
  server.getConnections((error, count) => {
    if (error) {
      console.log('Error: ', error);
    }

    console.log(`Active Connections: ${count}`);
  })

  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  })
}


process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

