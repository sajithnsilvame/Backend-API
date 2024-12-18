import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
//import swaggerAutogen from 'swagger-autogen';
import rateLimit from 'express-rate-limit';
import { logger } from './utils/logger';
import routes from './routes';
import { testDatabaseConnection } from './config/database';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const swaggerOutputFile = './swagger-output.json';

let swaggerDocs = {};
try {
  swaggerDocs = require(swaggerOutputFile);
} catch (error) {
  console.error(
    'Swagger documentation file not found. Please run `npm run swagger:gen` to generate it.'
  );
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined' as const, { stream: logger.stream as any })); 

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// API Routes
app.use('/api', routes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Test the database connection
(async () => {
  await testDatabaseConnection();
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
