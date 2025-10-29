import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { DBConnection } from './configs/db.config';
import router from './routes/routers';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));

DBConnection();

app.use('/api', router);


app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!'
  });
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
