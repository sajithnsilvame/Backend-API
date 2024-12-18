export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
  use_env_variable?: string;
}

interface Config {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

const config: Config = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME || "",
    "password": process.env.DB_PASSWORD || "",
    "database": process.env.DB_NAME || "",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "mysql",
    "use_env_variable": "DATABASE_URL"
  }
};

export default config; 