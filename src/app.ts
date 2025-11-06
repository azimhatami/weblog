import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { DBConnection } from './configs/db.config';
import { setupSwagger } from './configs/swagger.config';
import { errorHandler } from './middlewares/error.middleware';
import router from './routes/routers';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: false }));

DBConnection();

// Swagger document
setupSwagger(app);

app.use('/api', router);


// Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
