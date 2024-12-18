import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    retry: {
      max: 5, // Retry up to 5 times
    },
    pool: {
      max: 10, // Maximum number of connections
      min: 0, // Minimum number of connections
      acquire: 30000, // Maximum time in ms to acquire a connection
      idle: 10000, // Maximum time in ms a connection can be idle
    },
  }
);

// Test the database connection
export const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default sequelize;
